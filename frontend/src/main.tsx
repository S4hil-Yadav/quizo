import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000, refetchOnWindowFocus: false },
    mutations: {
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message || "Something went wrong");
        }
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* <ScrollToTop /> */}
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    {/* <PersistGate persistor={persistor}> */}
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <App />
      </QueryClientProvider>
    </Provider>
    {/* </PersistGate> */}
  </BrowserRouter>,
);
