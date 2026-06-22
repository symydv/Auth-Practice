// all the auth related state will be stored here

import {create} from "zustand"
import axios from "axios"

const API_URL = import.meta.env.MODE === 'development'? "http://localhost:3000/api/auth" : "/api/auth";
axios.defaults.withCredentials = true; //to send cookies

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,  
  message: null,

  signup: async(email, password, name) => {
    set({isLoading: true, error: null})
    try {
      const response =  await axios.post(`${API_URL}/signup`, {email, password, name})
      set({user: response.data.user, isAuthenticated: true, isLoading: false})
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "error signing up";
      set({error: message, isLoading: false})
      throw error;
    }
  },

  verifyEmail: async(code) => {
    set({isLoading: true, error: null})
    try {
      const response =  await axios.post(`${API_URL}/verify-email`, {code})
      set({user: response.data.user, isAuthenticated: true, isLoading: false})
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "error verifying email";
      set({error: message, isLoading: false})
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
      set({error: error.response?.data?.message || error.message || "Authentication failed", isCheckingAuth: false})
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
  },

  logout: async() => {
    set({isLoading: true, error: null})
    try {
      await axios.post(`${API_URL}/logout`)
      set({user: null, isAuthenticated: false, isLoading: false})
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "error logging out";
      set({error: message, isLoading: false})
      throw error;
    }
  },

  forgotPassword: async(email) => {
    set({isLoading: true, error: null, message:null})
    try {
      const response =  await axios.post(`${API_URL}/forgot-password`, {email})
      set({message: response.data.message, isLoading: false})
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "error sending reset email";
      set({error: message, isLoading: false})
      throw error;
    }
  },

  resetPassword: async(token, password) => {
    set({isLoading: true, error: null, message: null})
    try {
      const response =  await axios.post(`${API_URL}/reset-password/${token}`, {password})
      set({ message: response.data.message, isLoading: false})
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "error resetting password";
      set({error: message, isLoading: false})
      throw error;
    }
  }
}));
