import axios from "axios";

const baseURL = "http://localhost:3001/api/v1/";

const apiRequest = async (path, method, data) => {
  try {
    const response = await axios({
      method: method,
      url: `${baseURL}${path}`,
      data: data,
    });

    // console.log(response);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    return error;
  }
};

export { apiRequest };
