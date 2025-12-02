import api from '../lib/api';
import { transformRoom, transformRooms, type TransformedRoom } from '../utils/roomTransform';

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricePerNight: number;
  images: {
    main: string;
    thumbnails: string[];
  };
  features: string[];
  amenities: string[];
  maxGuests: number;
  maxRooms: number;
  view?: string;
  bedType?: string;
  hotelId?: number; // Add hotel_id for booking creation
}

export const roomService = {
  async getAllRooms(hotelId?: number): Promise<Room[]> {
    try {
      const url = hotelId ? `/rooms/hotel/${hotelId}` : '/rooms';
      const response = await api.get<any>(url);
      
      // Handle API response format: {success: true, data: [...]}
      let roomsData: any[];
      if (response.data && typeof response.data === 'object') {
        if (Array.isArray(response.data)) {
          // Direct array response
          roomsData = response.data;
        } else if (response.data.success && Array.isArray(response.data.data)) {
          // Wrapped response: {success: true, data: [...]}
          roomsData = response.data.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Alternative wrapper
          roomsData = response.data.data;
        } else {
          roomsData = [];
        }
      } else {
        roomsData = [];
      }
      
      // Check if data is already in the expected format (transformed)
      if (roomsData.length > 0 && roomsData[0].id && roomsData[0].name) {
        return roomsData as Room[];
      }
      
      // Transform database format to frontend format
      return transformRooms(roomsData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  async getRoomById(id: string): Promise<Room> {
    try {
      const response = await api.get<any>(`/rooms/${id}`);
      
      // Handle API response format: {success: true, data: {...}}
      let roomData: any;
      if (response.data && typeof response.data === 'object') {
        if (response.data.success && response.data.data) {
          roomData = response.data.data;
        } else if (response.data.data) {
          roomData = response.data.data;
        } else if (response.data.room_id || response.data.id) {
          roomData = response.data;
        } else {
          roomData = response.data;
        }
      } else {
        roomData = response.data;
      }
      
      // Check if data is already in the expected format (transformed)
      if (roomData.id && roomData.name) {
        return roomData as Room;
      }
      
      // Transform database format to frontend format
      return transformRoom(roomData);
    } catch (error) {
      console.error('Error fetching room:', error);
      throw error;
    }
  },

  async getRoomBySlug(slug: string): Promise<Room> {
    try {
      // Try slug endpoint first (if it exists)
      try {
        const response = await api.get<any>(`/rooms/slug/${slug}`);
        
        // Handle API response format
        let roomData: any;
        if (response.data && typeof response.data === 'object') {
          if (response.data.success && response.data.data) {
            roomData = response.data.data;
          } else if (response.data.data) {
            roomData = response.data.data;
          } else if (response.data.room_id || response.data.id) {
            roomData = response.data;
          } else {
            roomData = response.data;
          }
        } else {
          roomData = response.data;
        }
        
        // Check if data is already in the expected format (transformed)
        if (roomData.id && roomData.name) {
          return roomData as Room;
        }
        
        // Transform database format to frontend format
        return transformRoom(roomData);
      } catch (slugError: any) {
        // If slug endpoint doesn't exist (404) or fails, get all rooms and find by slug
        if (slugError.response?.status === 404) {
          console.log(`Slug endpoint not available, fetching all rooms to find "${slug}"`);
        }
        
        const allRooms = await this.getAllRooms();
        const room = allRooms.find(r => r.slug === slug);
        if (room) {
          return room;
        }
        throw new Error(`Room with slug "${slug}" not found`);
      }
    } catch (error) {
      console.error('Error fetching room by slug:', error);
      throw error;
    }
  },

  async checkAvailability(roomId: string, checkIn: string, checkOut: string): Promise<boolean> {
    const response = await api.get<{ available: boolean }>(
      `/rooms/${roomId}/availability`,
      {
        params: { checkIn, checkOut },
      }
    );
    return response.data.available;
  },
};

