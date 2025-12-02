import api from '../lib/api';

export interface PayPalOrderData {
  bookingId: string;
}

export interface PayPalOrderResponse {
  orderId: string;
  approvalUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
  booking: {
    id: string;
    bookingNumber: string;
    status: string;
  };
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentGateway: string;
  transactionReference: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
}

export const paymentService = {
  // PayPal payment flow
  async createPayPalOrder(data: PayPalOrderData): Promise<PayPalOrderResponse> {
    const response = await api.post<any>('/payments/create-order', data);
    const orderData = response.data.success?.data || response.data.data || response.data;
    return {
      orderId: orderData.orderId || orderData.id,
      approvalUrl: orderData.approvalUrl || orderData.approval_url || orderData.url,
    };
  },

  async capturePayPalOrder(orderId: string): Promise<PaymentResponse> {
    const response = await api.post<any>(`/payments/capture-order/${orderId}`);
    const paymentData = response.data.success?.data || response.data.data || response.data;
    return {
      success: paymentData.success || true,
      transactionId: paymentData.transaction_reference || paymentData.transactionId || orderId,
      message: paymentData.message || 'Payment completed successfully',
      booking: {
        id: paymentData.booking_id?.toString() || paymentData.bookingId || '',
        bookingNumber: paymentData.booking_number || paymentData.bookingNumber || '',
        status: paymentData.booking_status || paymentData.status || 'confirmed',
      },
    };
  },

  async getPaymentByBookingId(bookingId: string): Promise<Payment> {
    const response = await api.get<any>(`/payments/booking/${bookingId}`);
    const paymentData = response.data.success?.data || response.data.data || response.data;
    return {
      id: paymentData.payment_id?.toString() || paymentData.id?.toString() || '',
      bookingId: paymentData.booking_id?.toString() || paymentData.bookingId || bookingId,
      amount: parseFloat(paymentData.amount || '0'),
      paymentGateway: paymentData.payment_gateway || paymentData.paymentGateway || 'paypal',
      transactionReference: paymentData.transaction_reference || paymentData.transactionReference || '',
      status: (paymentData.status || 'pending') as 'pending' | 'completed' | 'failed' | 'refunded',
      createdAt: paymentData.created_at || paymentData.createdAt || new Date().toISOString(),
    };
  },

  async getMyPayments(): Promise<Payment[]> {
    const response = await api.get<any>('/payments/my-payments');
    let paymentsData: any[];
    if (response.data && typeof response.data === 'object') {
      if (Array.isArray(response.data)) {
        paymentsData = response.data;
      } else if (response.data.success && Array.isArray(response.data.data)) {
        paymentsData = response.data.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        paymentsData = response.data.data;
      } else {
        paymentsData = [];
      }
    } else {
      paymentsData = [];
    }
    
    return paymentsData.map((payment: any) => ({
      id: payment.payment_id?.toString() || payment.id?.toString() || '',
      bookingId: payment.booking_id?.toString() || payment.bookingId || '',
      amount: parseFloat(payment.amount || '0'),
      paymentGateway: payment.payment_gateway || payment.paymentGateway || 'paypal',
      transactionReference: payment.transaction_reference || payment.transactionReference || '',
      status: (payment.status || 'pending') as 'pending' | 'completed' | 'failed' | 'refunded',
      createdAt: payment.created_at || payment.createdAt || new Date().toISOString(),
    }));
  },

  async refundPayment(paymentId: string): Promise<void> {
    await api.post(`/payments/${paymentId}/refund`);
  },
};

