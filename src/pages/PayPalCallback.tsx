import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { paymentService } from '../services/paymentService';

const PayPalCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    const processPayment = async () => {
      const orderId = searchParams.get('token') || searchParams.get('orderId');
      const payerId = searchParams.get('PayerID');

      if (!orderId) {
        setStatus('error');
        setError('Payment order ID not found');
        return;
      }

      try {
        // Capture the PayPal order
        const result = await paymentService.capturePayPalOrder(orderId);
        
        // Store payment result for confirmation page
        sessionStorage.setItem('paymentResult', JSON.stringify(result));
        sessionStorage.removeItem('currentBooking');
        
        setStatus('success');
        
        // Redirect to confirmation page after a short delay
        setTimeout(() => {
          navigate('/confirmation');
        }, 2000);
      } catch (err: any) {
        setStatus('error');
        setError(err.response?.data?.message || 'Payment processing failed');
      }
    };

    processPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Navbar />
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mt-20">
        {status === 'processing' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC9E38] mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Processing your payment...</p>
            <p className="text-sm text-gray-600 mt-2">Please wait</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-green-600">Payment Successful!</p>
            <p className="text-sm text-gray-600 mt-2">Redirecting to confirmation...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-red-600">Payment Failed</p>
            <p className="text-sm text-gray-600 mt-2">{error}</p>
            <button
              onClick={() => navigate('/payment')}
              className="mt-4 px-4 py-2 bg-[#DC9E38] text-black rounded-lg font-semibold hover:bg-[#c38c2f]"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayPalCallback;

