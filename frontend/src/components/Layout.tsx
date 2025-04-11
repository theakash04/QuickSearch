import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen">
      <Outlet />
    </div>
  );
};
