import api from '../lib/api';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage?: string;
}

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
}

export const userService = {
  async getProfile(): Promise<User> {
    try {
      const response = await api.get<any>('/users/profile');
      
      // Handle API response format: {success: true, data: {...}} or direct object
      let userData: any;
      if (response.data && typeof response.data === 'object') {
        if (response.data.success && response.data.data) {
          // Wrapped response: {success: true, data: {...}}
          userData = response.data.data;
        } else if (response.data.data) {
          // Alternative wrapper
          userData = response.data.data;
        } else if (response.data.user_id || response.data.id || response.data.email) {
          // Direct user object
          userData = response.data;
        } else {
          userData = response.data;
        }
      } else {
        userData = response.data;
      }
      
      // Transform database format to frontend format if needed
      // Check if already in expected format
      if (userData.id && userData.fullName) {
        return userData as User;
      }
      
      // Transform from database format
      return {
        id: userData.user_id?.toString() || userData.id?.toString() || '',
        fullName: userData.name || userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone_number || userData.phone || '',
        profileImage: userData.profile_image || userData.profileImage,
      };
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      // If 400 or other error, try to get user from token/localStorage
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (localUser && localUser.email) {
        return {
          id: localUser.id || '',
          fullName: localUser.fullName || localUser.name || '',
          email: localUser.email || '',
          phone: localUser.phone || localUser.phone_number || '',
          profileImage: localUser.profileImage || localUser.profile_image,
        };
      }
      throw error;
    }
  },

  async updateProfile(data: UpdateUserData): Promise<User> {
    try {
      // Transform frontend format to backend format
      const backendData: any = {};
      if (data.fullName) backendData.name = data.fullName;
      if (data.email) backendData.email = data.email;
      if (data.phone) backendData.phone_number = data.phone;
      if (data.profileImage) backendData.profile_image = data.profileImage;

      const response = await api.put<any>('/users/profile', backendData);
      
      // Handle API response format
      let userData: any;
      if (response.data && typeof response.data === 'object') {
        if (response.data.success && response.data.data) {
          userData = response.data.data;
        } else if (response.data.data) {
          userData = response.data.data;
        } else {
          userData = response.data;
        }
      } else {
        userData = response.data;
      }
      
      // Transform to frontend format
      const transformedUser: User = {
        id: userData.user_id?.toString() || userData.id?.toString() || '',
        fullName: userData.name || userData.fullName || data.fullName || '',
        email: userData.email || data.email || '',
        phone: userData.phone_number || userData.phone || data.phone || '',
        profileImage: userData.profile_image || userData.profileImage || data.profileImage,
      };
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(transformedUser));
      
      return transformedUser;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  async uploadProfileImage(file: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post<{ imageUrl: string }>('/users/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

