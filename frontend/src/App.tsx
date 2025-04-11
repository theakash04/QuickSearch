import { createBrowserRouter, RouterProvider } from "react-router";
import AddLink from "./Pages/AddLink";
import NotFound from "./Pages/Error";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import { Layout } from "./components/Layout";
import Login from "./Pages/Login";
import { AuthProvider } from "./Context/AuthContext";
import Dashboard from "./Pages/Dashboard";
import AuthGuard from "./components/AuthGuard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: (
          <AuthGuard isProtected={false}>
            <Home />
          </AuthGuard>
        ),
      },
      {
        path: "add",
        element: (
          <AuthGuard isProtected>
            <AddLink />
          </AuthGuard>
        ),
      },
      {
        path: "search",
        element: (
          <AuthGuard isProtected>
            <Search />
          </AuthGuard>
        ),
      },
      {
        path: "login",
        element: (
          <AuthGuard isProtected={false}>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AuthGuard isProtected>
            <Dashboard />
          </AuthGuard>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
}

export default App;
