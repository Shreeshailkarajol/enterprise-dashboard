import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import { store } from "./app/store";
import AuthInitializer from "./app/AuthInitializer";

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
    <React.StrictMode>
      <Provider store={store}>
        <AuthInitializer />
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
});