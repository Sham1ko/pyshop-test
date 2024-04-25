// registrationStore.ts
import { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { api, authApi } from 'src/boot/axios';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: {
      id: undefined,
      email: undefined,
    },
    token: undefined,
    isLoggedIn: false,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        console.log('Logging in with:', email, password);
        const response = await api.post('/auth/login', { email, password });
        const { user, token } = response.data;
        this.user = user;
        this.token = token;
        this.isLoggedIn = true;
        localStorage.setItem('token', token);
        this.router.push({ path: '/' });
      } catch (error) {
        console.error(error);
      }
    },
    async register(email: string, password: string) {
      try {
        const response = await api.post('/auth/register', { email, password });
        console.log(response);
        return true;
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      this.user = {
        id: undefined,
        email: undefined,
      };
      this.token = undefined;
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      this.router.push({ path: '/login' });
    },
    fetchUser() {
      authApi.get('/auth/me').then((response: AxiosResponse) => {
        const { user } = response.data;
        this.isLoggedIn = true;
        this.user = user;
      });
    },
  },
});
