import { useEffect } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Dashboard from "./componets/Dashboard";
import Demo from "./componets/Demo";
import Signin from "./componets/Signin";
import Signup from "./componets/Signup";
import Transfer from "./componets/Transfer";
import { AuthProvider, useAuth } from "./utils/auth";

function App() {
  const { updateToken } = useAuth();

  // Function to update token and store it in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      updateToken(token);
    }
  });
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
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
