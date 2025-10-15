"use client";

import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const backendURL = "https://nexxupp-com-backend.onrender.com";
  const [price, setPrice] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ global loading

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/api/price/all`);
      if (response.data.success) {
        setPrice(response.data.prices || []);
      } else {
        toast.error(response.data.message || "Failed to fetch prices");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addQuery = async ({ email, priceCardId, message }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/query/add`, { email, priceCardId, message });
      if (response.data.success) {
        toast.success(response.data.message || "Query submitted successfully!");
      } else {
        toast.error(response.data.message || "Failed to submit query.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to submit query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ price, fetchPrices, addQuery, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
