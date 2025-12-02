import api from '../lib/api';

export interface SignUpData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  };
}

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    // Transform frontend format to backend format
    const backendData = {
      name: data.fullName,
      email: data.email,
      phone_number: data.phone,
      password: data.password,
    };
    
    const response = await api.post<any>('/auth/signup', backendData);
    
    // Handle API response format: {success: true, data: {token, user}}
    let authData: any;
    if (response.data && typeof response.data === 'object') {
      if (response.data.success && response.data.data) {
        authData = response.data.data;
      } else if (response.data.token) {
        authData = response.data;
      } else {
        authData = response.data;
      }
    } else {
      authData = response.data;
    }
    
    // Transform backend user format to frontend format
    const user = authData.user || authData;
    const transformedUser = {
      id: user.user_id?.toString() || user.id?.toString() || '',
      fullName: user.name || user.fullName || data.fullName,
      email: user.email || data.email,
      phone: user.phone_number || user.phone || data.phone,
    };
    
    if (authData.token) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify(transformedUser));
    }
    
    return {
      token: authData.token || '',
      user: transformedUser,
    };
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await api.post<any>('/auth/signin', data);
    
    // Handle API response format
    let authData: any;
    if (response.data && typeof response.data === 'object') {
      if (response.data.success && response.data.data) {
        authData = response.data.data;
      } else if (response.data.token) {
        authData = response.data;
      } else {
        authData = response.data;
      }
    } else {
      authData = response.data;
    }
    
    // Transform backend user format to frontend format
    const user = authData.user || authData;
    const transformedUser = {
      id: user.user_id?.toString() || user.id?.toString() || '',
      fullName: user.name || user.fullName || '',
      email: user.email || data.email,
      phone: user.phone_number || user.phone || '',
    };
    
    if (authData.token) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify(transformedUser));
    }
    
    return {
      token: authData.token || '',
      user: transformedUser,
    };
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optionally call backend logout endpoint
    // await api.post('/auth/logout');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};

