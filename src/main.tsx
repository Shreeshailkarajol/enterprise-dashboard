import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import { store } from "./app/store";
import AuthInitializer from "./app/AuthInitializer";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");

    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AuthInitializer />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    // </React.StrictMode>
  );
});