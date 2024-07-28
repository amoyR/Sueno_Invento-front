import api from './api';

const authService = {
  async googleSignUp(): Promise<any> {
    const response = await api.get('/auth/google/signup');
    window.location.href = response.data.redirect_url;
  },

  async googleSignIn(): Promise<any> {
    const response = await api.get('/auth/google/signin');
    window.location.href = response.data.redirect_url;
  },

  async handleGoogleCallback(code: string): Promise<any> {
    const response = await api.get(`/auth/google/callback?code=${code}`);
    localStorage.setItem('token', response.data.token);
    return {
      user: response.data.user,
      isNewUser: response.data.isNewUser
    };
  },

  async getCurrentUser(): Promise<any> {
    return await api.get('/auth/user');
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },
};

export default authService;
