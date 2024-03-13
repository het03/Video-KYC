import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./index.css";
import Home from "./Pages/Home.jsx";
import Start from "./Pages/GetStarted.jsx";
import Terms from "./Components/Terms.jsx";
import Features from "./Pages/Features.jsx";
import Team from "./Pages/Team.jsx";
import Contact from "./Pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "start",
    element: <Start />,
  },
  {
    path: "Team",
    element: <Team />,
  },
  {
    path: "Contact",
    element: <Contact />,
  },
  {
    path: "terms",
    element: <Terms />,
  },
  {
    path: "Features",
    element: <Features />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
