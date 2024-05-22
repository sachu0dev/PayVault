import { useState } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Dashboard from "./componets/Dashboard";
import Demo from "./componets/Demo";
import Signin from "./componets/Signin";
import Signup from "./componets/Signup";
import Transfer from "./componets/Transfer";
import { UserContext } from "./utils/context";

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <Outlet />
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
