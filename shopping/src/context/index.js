"use client";
import { createContext, useState  } from "react";
import { apiRequest } from "./request";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  const createStore = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    if (response.status !== 200) {
      console.log(response.data);
    }
    setApiData(response.data);
    return response;
  };

  const getStore = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const createSeller = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    if (response.status !== 200) {
      console.log(response.data);
    }
    setApiData(response.data);
    return response;
  };

  const getSeller = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const deleteSeller = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const updateSeller = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    // console.log(response);
    return response;
  };

  const createProduct = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    if (response.status !== 200) {
      console.log(response.data);
    }
    setApiData(response.data);
    return response;
  };

  const getProduct = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const deleteProduct = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const updateProduct = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    // console.log(response);
    return response;
  };

  const createDepartment = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    if (response.status !== 200) {
      console.log(response.data);
    }
    setApiData(response.data);
    return response;
  };

  const getDepartment = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const deleteDepartment = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const updateDepartment = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    // console.log(response);
    return response;
  };

  const createOrder = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    if (response.status !== 200) {
      console.log(response.data);
    }
    setApiData(response.data);
    return response;
  };

  const getOrders = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const updateOrders = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    // console.log(response);
    return response;
  };

  const deleteOrder = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  const createProductOrder = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    if (response.status !== 200) {
      console.log(response.data);
    }
    setApiData(response.data);
    return response;
  };

  const updateProductOrders = async (path, method, data) => {
    const response = await apiRequest(path, method, data);
    // console.log(response);
    return response;
  };

  const deleteProductOrder = async (path, method) => {
    const response = await apiRequest(path, method);
    // console.log(response);
    return response;
  };

  return (
    <ApiContext.Provider
      value={{
        apiData,
        createStore,
        getStore,
        createSeller,
        getSeller,
        deleteSeller,
        updateSeller,
        createProduct,
        getProduct,
        deleteProduct,
        updateProduct,
        createDepartment,
        getDepartment,
        deleteDepartment,
        updateDepartment,
        createOrder,
        getOrders,
        deleteOrder,
        updateOrders ,
        createProductOrder,
        deleteProductOrder,
        updateProductOrders,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
