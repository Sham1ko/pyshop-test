// registrationStore.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: {
      email: '',
      password: '',
    },
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        console.log('Logging in with:', email, password);
        this.router.push({ path: '/' });
        return true;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
