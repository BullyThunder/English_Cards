import { api } from "@/src/lib/api";

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async register(email: string, password: string, name: string) {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
