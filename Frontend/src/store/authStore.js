// all the auth related state will be stored here

import {create} from "zustand"
import axios from "axios"

const API_URL = "http://localhost:3000/api/auth"
axios.defaults.withCredentials = true; //to send cookies

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,  

  signup: async(email, password, name) => {
    set({isLoading: true, error: null})
    try {
      const response =  await axios.post(`${API_URL}/signup`, {email, password, name})
      set({user: response.data.user, isAuthenticated: true, isLoading: false})
    } catch (error) {
      set({error: error.response.data.message || "error signing up", isLoading: false})
      throw error;
    }
  },

  verifyEmail: async(code) => {
    set({isLoading: true, error: null})
    try {
      const response =  await axios.post(`${API_URL}/verify-email`, {code})
      set({user: response.data.user, isAuthenticated: true, isLoading: false})
    } catch (error) {
      set({error: error.response.data.message || "error signing up", isLoading: false})
      throw error;
    }
  },

    // check if user is logged in, used in App.jsx  
  checkAuth: async() => {
    set({isCheckingAuth: true, error: null})
    try {
      const response = await axios.get(`${API_URL}/checkAuth`);
      set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false})
    } catch (error) {
      set({error:null, isCheckingAuth: false})
    }
  },

  login: async(email, password) => {
    set({isLoading: true, error: null})
    try {
      const response =  await axios.post(`${API_URL}/login`, {email, password})
      set({user: response.data.user, isAuthenticated: true, isLoading: false})
    } catch (error) {
      set({error: error.response.data.message || "error logging in", isLoading: false})
      throw error;
    }
  }
}));
