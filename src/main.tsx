import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store"; 
import { loadSession } from "./store/slices/authSlice";
import "./styles/global.css";

// restaura sessão ao iniciar
store.dispatch(loadSession());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
