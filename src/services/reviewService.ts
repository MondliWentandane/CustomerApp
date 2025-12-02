import api from '../lib/api';

export interface Review {
  id: string;
  userId: string;
  hotelId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

export interface CreateReviewData {
  hotelId: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  async getHotelReviews(hotelId: string): Promise<Review[]> {
    const response = await api.get<any>(`/reviews/hotel/${hotelId}`);
    
    let reviewsData: any[];
    if (response.data && typeof response.data === 'object') {
      if (Array.isArray(response.data)) {
        reviewsData = response.data;
      } else if (response.data.success && Array.isArray(response.data.data)) {
        reviewsData = response.data.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        reviewsData = response.data.data;
      } else {
        reviewsData = [];
      }
    } else {
      reviewsData = [];
    }
    
    return reviewsData.map((review: any) => ({
      id: review.review_id?.toString() || review.id?.toString() || '',
      userId: review.user_id?.toString() || review.userId || '',
      hotelId: review.hotel_id?.toString() || review.hotelId || '',
      rating: review.rating || 0,
      comment: review.comment || '',
      createdAt: review.created_at || review.createdAt || new Date().toISOString(),
      user: review.user,
    }));
  },

  async createReview(data: CreateReviewData): Promise<Review> {
    const response = await api.post<any>('/reviews', data);
    const reviewData = response.data.success?.data || response.data.data || response.data;
    return {
      id: reviewData.review_id?.toString() || reviewData.id?.toString() || '',
      userId: reviewData.user_id?.toString() || reviewData.userId || '',
      hotelId: reviewData.hotel_id?.toString() || reviewData.hotelId || data.hotelId,
      rating: reviewData.rating || data.rating,
      comment: reviewData.comment || data.comment,
      createdAt: reviewData.created_at || reviewData.createdAt || new Date().toISOString(),
    };
  },

  async updateReview(id: string, data: Partial<CreateReviewData>): Promise<Review> {
    const response = await api.put<any>(`/reviews/${id}`, data);
    const reviewData = response.data.success?.data || response.data.data || response.data;
    return {
      id: reviewData.review_id?.toString() || reviewData.id?.toString() || id,
      userId: reviewData.user_id?.toString() || reviewData.userId || '',
      hotelId: reviewData.hotel_id?.toString() || reviewData.hotelId || '',
      rating: reviewData.rating || data.rating || 0,
      comment: reviewData.comment || data.comment || '',
      createdAt: reviewData.created_at || reviewData.createdAt || new Date().toISOString(),
    };
  },

  async deleteReview(id: string): Promise<void> {
    await api.delete(`/reviews/${id}`);
  },
};

