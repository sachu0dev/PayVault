import { useState } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Dashboard from "./componets/Dashboard";
import Demo from "./componets/Demo";
import Signin from "./componets/Signin";
import Signup from "./componets/Signup";
import Transfer from "./componets/Transfer";
import { ToContext, UserContext } from "./utils/context";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pay-vault.vercel.app/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://pay-vault-frontend.vercel.app/",
  },
});
function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [to, setTo] = useState();

  return (
    <>
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <ToContext.Provider value={{ to, setTo }}>
          <Outlet />
        </ToContext.Provider>
      </UserContext.Provider>
    </>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Demo />,
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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Demo />,
      },
      {
        path: "/transfer",
        element: <Transfer />,
      },
    ],
  },
]);

export default AppRouter;
