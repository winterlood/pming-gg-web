import axios from "axios";

function getToken() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") as string);
    return auth.jwt;
  } catch (err) {
    return null;
  }
}

export const stroageAgent = axios.create({
  baseURL: "https://pming.fdsafdsa.shop/pmingg",
});

const agent = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://pming.fdsafdsa.shop/api"
      : "http://192.168.0.13:1337/api",
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
    return Promise.reject(error.response.data.error.message);
  }
);

export default agent;
