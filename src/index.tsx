import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "@store/createStore";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#3A7EFF",
    },
    secondary: {
      main: "#EAF1FF",
    },
  },
  // shape: {
  //   borderRadius: 40,
  // },
  // components: {
  //   MuiInputBase: {
  //     styleOverrides: {
  //       root: {
  //         width: "100%",
  //         borderRadius: 40,
  //         padding: "12px 24px",
  //         position: "relative",
  //         border: "1px solid #ced4da",
  //       },
  //       focused: {
  //         boxShadow: `rgba(41,114,254,0.5) 0 0 0 0.1rem`,
  //         borderColor: "rgb(41,114,254)",
  //       },
  //     },
  //   },
  //   MuiInput: {
  //     styleOverrides: {
  //       root: {
  //         border: "1px solid #ced4da",
  //         transitions: {
  //           duration: {
  //             shortest: 150,
  //             shorter: 200,
  //             short: 250,
  //             standard: 300,
  //             complex: 375,
  //             enteringScreen: 225,
  //             leavingScreen: 195,
  //           },
  //         },
  //       },
  //       focused: {
  //         boxShadow: `rgba(41,114,254,0.5) 0 0 0 0.1rem`,
  //         borderColor: "rgb(41,114,254)",
  //       },
  //     },
  //   },
  // },
});
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
);
