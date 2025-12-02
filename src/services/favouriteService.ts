import api from '../lib/api';

export interface Favourite {
  id: string;
  hotelId: string;
  hotelName?: string;
  createdAt: string;
}

export const favouriteService = {
  async getMyFavourites(): Promise<Favourite[]> {
    const response = await api.get<any>('/favourites/my-favourites');
    
    // Handle API response format
    let favouritesData: any[];
    if (response.data && typeof response.data === 'object') {
      if (Array.isArray(response.data)) {
        favouritesData = response.data;
      } else if (response.data.success && Array.isArray(response.data.data)) {
        favouritesData = response.data.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        favouritesData = response.data.data;
      } else {
        favouritesData = [];
      }
    } else {
      favouritesData = [];
    }
    
    return favouritesData.map((fav: any) => ({
      id: fav.favourite_id?.toString() || fav.id?.toString() || '',
      hotelId: fav.hotel_id?.toString() || fav.hotelId || '',
      hotelName: fav.hotel_name || fav.hotelName,
      createdAt: fav.created_at || fav.createdAt || new Date().toISOString(),
    }));
  },

  async addFavourite(hotelId: string): Promise<Favourite> {
    const response = await api.post<any>('/favourites', { hotelId });
    const favouriteData = response.data.success?.data || response.data.data || response.data;
    return {
      id: favouriteData.favourite_id?.toString() || favouriteData.id?.toString() || '',
      hotelId: favouriteData.hotel_id?.toString() || favouriteData.hotelId || hotelId,
      hotelName: favouriteData.hotel_name || favouriteData.hotelName,
      createdAt: favouriteData.created_at || favouriteData.createdAt || new Date().toISOString(),
    };
  },

  async removeFavourite(favouriteId: string): Promise<void> {
    await api.delete(`/favourites/${favouriteId}`);
  },

  async removeFavouriteByHotel(hotelId: string): Promise<void> {
    await api.delete(`/favourites/hotel/${hotelId}`);
  },

  async checkFavourite(hotelId: string): Promise<boolean> {
    try {
      const response = await api.get<any>(`/favourites/check/${hotelId}`);
      return response.data.isFavourite || response.data.success || false;
    } catch {
      return false;
    }
  },
};

