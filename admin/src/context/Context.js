"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const backendURL = "https://nexxupp-com-backend.onrender.com";
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mail, setMail] = useState([]);
  const [price, setPrice] = useState([]);
  const [projects, setProjects] = useState([]);

  // Load token from localStorage and fetch data
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchMail(savedToken);
      fetchPrices(savedToken);
      fetchProjects();
    }
    setLoading(false);
  }, []);

  // Login
  const loginToken = async (email, password) => {
    try {
      const response = await axios.post(`${backendURL}/api/admin/login`, { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        fetchMail(response.data.token);
        fetchPrices(response.data.token);
        fetchProjects();
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  // Fetch mail
  const fetchMail = async (authToken) => {
    if (!authToken) return;
    try {
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const response = await axios.get(`${backendURL}/api/query/all`, config);
      if (response.data.success) setMail(response.data.queries || []);
      else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch prices
  const fetchPrices = async (authToken) => {
    if (!authToken) return;
    try {
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const response = await axios.get(`${backendURL}/api/price/all`, config);
      if (response.data.success) setPrice(response.data.prices || []);
      else toast.error(response.data.message || "Failed to fetch prices");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Add price
  const addPricePlan = async (plan) => {
    if (!token) return toast.error("You are not logged in!");
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(`${backendURL}/api/price/add`, plan, config);
      if (response.data.success) {
        toast.success("Price plan added successfully");
        await fetchPrices(token);
      } else toast.error(response.data.message || "Failed to add plan");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // Remove price
  const removePricePlan = async (id) => {
    if (!token) return toast.error("You are not logged in!");
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(`${backendURL}/api/price/remove`, { id }, config);
      if (response.data.success) {
        toast.success("Price plan removed successfully");
        await fetchPrices(token);
      } else toast.error(response.data.message || "Failed to remove plan");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // ===== Projects =====
  const fetchProjects = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/project/all`);
      if (response.data.success) {
        setProjects(response.data.projects || []);
      } else {
        toast.error(response.data.message || "Failed to fetch projects");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch projects");
    }
  };

  const addProject = async (formData) => {
    if (!token) return toast.error("You are not logged in!");
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      };
      const response = await axios.post(`${backendURL}/api/project/add`, formData, config);
      if (response.data.success) {
        toast.success("Project added successfully");
        await fetchProjects();
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message || "Failed to add project");
    }
  };

  const removeProject = async (id) => {
    if (!token) return toast.error("You are not logged in!");
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(`${backendURL}/api/project/remove`, { id }, config);
      if (response.data.success) {
        toast.success("Project removed successfully");
        await fetchProjects();
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message || "Failed to remove project");
    }
  };

  const value = {
    backendURL,
    token,
    setToken,
    loginToken,
    logout,
    loading,
    mail,
    fetchMail,
    setMail,
    price,
    fetchPrices,
    addPricePlan,
    removePricePlan,
    projects,
    fetchProjects,
    addProject,
    removeProject,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
export default ContextProvider;
