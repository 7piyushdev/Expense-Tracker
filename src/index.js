import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProvider from "./context-store/AuthProvider";
import CompleteProfile from "./views/PrivatePages/CompleteProfile";
import LoginScreen from "./views/PublicPages/LoginScreen";
import ExpenseProvider from "./context-store/ExpenseProvider";
import HomePage from "./views/PrivatePages/HomePage";
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ExpenseProvider>
            <Routes>
              <Route path='/' element={<LoginScreen />} />
              <Route path='/home' element={<App />}>
                <Route path='/home' element={<HomePage />} />
                <Route
                  path='/home/complete-profile'
                  element={<CompleteProfile />}
                />
              </Route>
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </ExpenseProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
