import axios, { AxiosRequestConfig } from "axios";

function getToken() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") as string);
    return auth.jwt;
  } catch (err) {
    return null;
  }
}

export const stroageAgent = axios.create({
  baseURL: "https://devstu.fdsafdsa.shop/pmingg",
});

const agent = axios.create({
  baseURL: "http://localhost:1337/api",
  // baseURL: "http://34.64.92.51:1337/api",
});

agent.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

agent.interceptors.response.use(
  (res) => res,
  function (error) {
    // Do something with response error
    return Promise.reject(error.response.data.error.message);
  }
);

export default agent;
