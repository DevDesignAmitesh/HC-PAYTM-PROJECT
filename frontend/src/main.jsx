import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Signup } from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";
import { SendMoney } from "./pages/SendMoney.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute.jsx";
import Me from "./pages/Me.jsx";
import Update from "./pages/Update.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/me",
    element: (
      <PrivateRoute>
        <Me />
      </PrivateRoute>
    ),
  },
  {
    path: "/update",
    element: (
      <PrivateRoute>
        <Update />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/sendmoney",
    element: (
      <PrivateRoute>
        <SendMoney />
      </PrivateRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
