import api from '../lib/api';

export interface BookingData {
  roomId: string;
  checkIn: string;
  checkOut: string;
  numberOfRooms: number;
  numberOfGuests: number;
  includeBreakfast?: boolean;
  hotelId?: number; // Optional - backend might get it from room_id
}

export interface Booking {
  id: string;
  bookingNumber: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  numberOfRooms: number;
  numberOfGuests: number;
  includeBreakfast: boolean;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  };
}

export interface BookingResponse {
  booking: Booking;
  message: string;
}

export const bookingService = {
  async createBooking(data: BookingData): Promise<BookingResponse> {
    // Transform frontend format to backend format
    const roomIdNum = parseInt(data.roomId, 10);
    if (isNaN(roomIdNum)) {
      throw new Error('Invalid room ID');
    }
    
    // If hotel_id is not provided, fetch room details to get hotel_id
    let hotelId = data.hotelId;
    if (!hotelId) {
      try {
        const roomResponse = await api.get<any>(`/rooms/${roomIdNum}`);
        const roomData = roomResponse.data?.success?.data || roomResponse.data?.data || roomResponse.data;
        hotelId = roomData.hotel_id || roomData.hotelId;
        
        if (!hotelId) {
          throw new Error('Hotel ID not found in room data. Please ensure the room has an associated hotel.');
        }
      } catch (error: any) {
        console.error('Error fetching room for hotel_id:', error);
        throw new Error('Failed to get hotel information. Please try again.');
      }
    }
    
    const backendData: any = {
      room_id: roomIdNum,
      hotel_id: hotelId, // Backend requires hotel_id
      check_in_date: data.checkIn,
      check_out_date: data.checkOut,
      number_of_rooms: data.numberOfRooms,
      number_of_guests: data.numberOfGuests,
    };
    
    try {
      const response = await api.post<any>('/bookings', backendData);
      
      // Handle API response format: {success: true, data: {...}} or direct object
      let bookingData: any;
      if (response.data && typeof response.data === 'object') {
        if (response.data.success && response.data.data) {
          bookingData = response.data.data;
        } else if (response.data.booking) {
          bookingData = response.data.booking;
        } else if (response.data.booking_id || response.data.id) {
          bookingData = response.data;
        } else {
          bookingData = response.data;
        }
      } else {
        bookingData = response.data;
      }
      
      return {
        booking: this.transformBooking(bookingData),
        message: response.data.message || 'Booking created successfully',
      };
    } catch (error: any) {
      // Log detailed error for debugging
      if (error.response) {
        console.error('Booking creation error:', {
          status: error.response.status,
          data: error.response.data,
          request: backendData,
        });
        throw new Error(error.response.data?.message || `Failed to create booking: ${error.response.status}`);
      }
      throw error;
    }
  },

  async getUserBookings(): Promise<Booking[]> {
    const response = await api.get<any>('/bookings/my-bookings');
    
    // Handle API response format: {success: true, data: [...]} or direct array
    let bookingsData: any[];
    if (response.data && typeof response.data === 'object') {
      if (Array.isArray(response.data)) {
        // Direct array response
        bookingsData = response.data;
      } else if (response.data.success && Array.isArray(response.data.data)) {
        // Wrapped response: {success: true, data: [...]}
        bookingsData = response.data.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        // Alternative wrapper
        bookingsData = response.data.data;
      } else {
        bookingsData = [];
      }
    } else {
      bookingsData = [];
    }
    
    // Transform database format to frontend format if needed
    return bookingsData.map((booking: any) => this.transformBooking(booking));
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await api.get<any>(`/bookings/${id}`);
    // Handle response format
    const bookingData = response.data.success?.data || response.data.data || response.data;
    return this.transformBooking(bookingData);
  },

  async cancelBooking(id: string): Promise<void> {
    await api.patch(`/bookings/${id}/cancel`);
  },

  async modifyBooking(id: string, data: Partial<BookingData>): Promise<Booking> {
    const response = await api.patch<any>(`/bookings/${id}/modify`, data);
    // Handle response format
    const bookingData = response.data.success?.data || response.data.data || response.data;
    return this.transformBooking(bookingData);
  },

  transformBooking(booking: any): Booking {
    return {
      id: booking.booking_id?.toString() || booking.id?.toString() || '',
      bookingNumber: booking.booking_number || booking.bookingNumber || booking.booking_id?.toString() || '',
      roomId: booking.room_id?.toString() || booking.roomId || '',
      roomName: booking.room_type || booking.roomName || 'Room',
      checkIn: booking.check_in_date || booking.checkIn || '',
      checkOut: booking.check_out_date || booking.checkOut || '',
      numberOfRooms: booking.number_of_rooms || booking.numberOfRooms || 1,
      numberOfGuests: booking.number_of_guests || booking.numberOfGuests || 1,
      includeBreakfast: booking.include_breakfast || booking.includeBreakfast || false,
      status: (booking.status || 'pending') as 'pending' | 'confirmed' | 'cancelled' | 'completed',
      totalAmount: parseFloat(booking.total_price || booking.totalAmount || '0'),
      createdAt: booking.created_at || booking.createdAt || new Date().toISOString(),
      user: booking.user || {
        id: booking.user_id?.toString() || '',
        fullName: '',
        email: '',
        phone: '',
      },
    };
  },
};

