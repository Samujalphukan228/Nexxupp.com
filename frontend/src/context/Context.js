"use client";

import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {

  const backendURL = "http://localhost:5000";



  const [price, setPrice] = useState([]);
  const [projects, setProjects] = useState([]); // renamed to plural for clarity
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  // Fetch price plans
  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/api/price/all`);
      if (response.data.success) setPrice(response.data.prices || []);
      else toast.error(response.data.message || "Failed to fetch prices");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/project/all`);
      if (response.data.success) setProjects(response.data.projects || []); // fixed key to `projects`
      else toast.error(response.data.message || "Failed to fetch projects");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add query
  const addQuery = async ({ email, priceCardId, message }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/query/add`, { email, priceCardId, message });
      if (response.data.success) toast.success(response.data.message || "Query submitted successfully!");
      else toast.error(response.data.message || "Failed to submit query.");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to submit query.");
    } finally {
      setLoading(false);
    }
  };

  // Hide first-load loader after brief delay
  useEffect(() => {
    const timeout = setTimeout(() => setFirstLoad(false), 100); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AppContext.Provider value={{
      price,
      fetchPrices,
      projects,  
      fetchProjects, 
      addQuery,
      loading,
      firstLoad
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
