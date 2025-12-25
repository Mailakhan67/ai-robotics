// import { chatbotConfig } from '../config/chatbot.config';

// interface UserCredentials {
//   email: string;
//   password: string;
// }

// interface UserSignupData {
//   email: string;
//   full_name: string;
//   password: string;
//   software_background: string;
//   hardware_background: string;
//   purpose_of_learning: string;
// }

// interface UserResponse {
//   id: number;
//   email: string;
//   full_name: string;
//   created_at: string;
//   software_background?: string;
//   hardware_background?: string;
//   purpose_of_learning?: string;
// }

// interface TokenResponse {
//   access_token: string;
//   token_type: string;
// }

// class AuthApi {
//   private baseUrl: string;

//   constructor() {
//     this.baseUrl = chatbotConfig.BACKEND_URL;
//   }

//   private getToken(): string | null {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('auth_token');
//     }
//     return null;
//   }

//   private setToken(token: string): void {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('auth_token', token);
//     }
//   }

//   private clearToken(): void {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('auth_token');
//     }
//   }

//   async signup(userData: UserSignupData): Promise<UserResponse> {
//     const response = await fetch(`${this.baseUrl}/auth/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.detail || 'Signup failed');
//     }

//     return response.json();
//   }

//   async signin(credentials: UserCredentials): Promise<TokenResponse> {
//     try {
//       const response = await fetch(`${this.baseUrl}/auth/signin`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.detail || `Login failed with status: ${response.status}`);
//       }

//       const tokenData = await response.json();

//       // Store the token for future requests
//       this.setToken(tokenData.access_token);

//       return tokenData;
//     } catch (error) {
//       if (error instanceof TypeError && error.message.includes('fetch')) {
//         // Network error - backend might not be running
//         throw new Error('Unable to connect to authentication server. Please ensure the backend is running.');
//       }
//       throw error;
//     }
//   }

//   async getUserInfo(): Promise<UserResponse> {
//     const token = this.getToken();

//     if (!token) {
//       throw new Error('No authentication token found');
//     }

//     try {
//       const response = await fetch(`${this.baseUrl}/auth/me`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         // If the token is invalid, clear it
//         if (response.status === 401) {
//           this.clearToken();
//         }
//         throw new Error(`Failed to fetch user info: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       if (error instanceof TypeError && error.message.includes('fetch')) {
//         // Network error - backend might not be running
//         throw new Error('Unable to connect to user info server. Please ensure the backend is running.');
//       }
//       throw error;
//     }
//   }

//   async logout(): Promise<{message: string}> {
//     try {
//       const response = await fetch(`${this.baseUrl}/auth/logout`, {
//         method: 'POST',
//       });

//       if (!response.ok) {
//         throw new Error(`Logout failed with status: ${response.status}`);
//       }

//       const result = await response.json();

//       // Clear the stored token
//       this.clearToken();

//       return result;
//     } catch (error) {
//       // Even if the backend logout fails, clear the local token
//       this.clearToken();
//       if (error instanceof TypeError && error.message.includes('fetch')) {
//         // Network error - backend might not be running
//         console.warn('Warning: Unable to connect to logout server. Local session cleared.');
//         return { message: 'Logged out successfully' };
//       }
//       console.error('Logout error:', error);
//       return { message: 'Logged out successfully' };
//     }
//   }
// }

// export const authApi = new AuthApi();
// export type { UserCredentials, UserSignupData, UserResponse, TokenResponse };






















































import { chatbotConfig } from '../config/chatbot.config';

const BASE_URL = chatbotConfig.BACKEND_URL;

// Store and retrieve token from localStorage
const TOKEN_KEY = 'auth_token';

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

const clearToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const authApi = {
  // LOGIN
  async signin(data: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Login failed');
    }

    const tokenData = await res.json(); // { access_token, token_type }

    // Store the token for future requests
    setToken(tokenData.access_token);

    return tokenData;
  },

  // SIGNUP
  async signup(data: any) {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Signup failed');
    }

    const result = await res.json();

    // After successful signup, the user is created but not automatically logged in
    // We need to return the user data so the frontend can handle the login
    return result;
  },

  // GET CURRENT USER
  async getUserInfo(token?: string) {
    // If token is provided, use it; otherwise, get from localStorage
    const authToken = token || getToken();

    if (!authToken) {
      throw new Error('No authentication token found');
    }

    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!res.ok) {
      // If the token is invalid, clear it
      if (res.status === 401) {
        clearToken();
      }
      throw new Error('Failed to fetch user info');
    }

    return res.json();
  },

  // LOGOUT
  async logout() {
    try {
      const token = getToken();
      if (token) {
        await fetch(`${BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local token clearing even if API call fails
    } finally {
      // Clear the stored token
      clearToken();
    }
  }
};
