import axios, { AxiosError } from "axios";

const IS_PRODUCTION_SERVER_TEST = true;

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
  baseURL: "http://localhost:1337/api",
  // baseURL: !IS_PRODUCTION_SERVER_TEST
  //   ? process.env.NODE_ENV === "production"
  //     ? "https://pming.fdsafdsa.shop/api"
  //     : "http://192.168.0.13:1337/api"
  //   : "https://pming.fdsafdsa.shop/api",
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
  function (error: AxiosError) {
    if (axios.isAxiosError(error)) {
      let errorMessage = error.message;
      if (error.response) {
        const errorCode = error.response.status;
        // @ts-ignore
        errorMessage = error.response.data.error.message;
        if (errorCode === 401) {
          window.location.href = "/logout";
        }
      }
      return Promise.reject(errorMessage);
    } else {
      console.log(
        "unexpected error this error :: this error is not axios error"
      );
      return Promise.reject("서버에 문제가 발생하였습니다.");
    }
  }
);

export default agent;
