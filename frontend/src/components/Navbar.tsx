import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import Avatar from "./Avatar";
import axios from "axios";
import { useState } from "react";
import { useAlert } from "../Context/AlertContext";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const { show } = useAlert();

  function handleLogout() {
    setIsLoggingOut(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(null);
          setIsLoggingOut(false);
          navigate("/", { replace: true });
          show("Logged out successfully");
        }
      })
      .catch((err) => {
        show(err.response.data.message);
        setIsLoggingOut(false);
      });
  }
  return (
    <nav className="flex items-center justify-between w-full max-w-7xl p-6 bg-white/5 border border-white/10 rounded-xl shadow-xl backdrop-blur-lg transition-all duration-300">
      <div className="flex items-center gap-4">
        <Avatar imageUrl={user?.avatar} name={user?.name || ""} />
        <h1 className="text-md sm:text-xl font-semibold text-slate-100">
          {user?.name || "User"}
        </h1>
      </div>
      <button
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
        disabled={isLoggingOut}
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
        </svg>
      </button>
    </nav>
  );
}
