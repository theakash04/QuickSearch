import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/Loading";
import { useAlert } from "../Context/AlertContext";
interface BackendLoginResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
}

interface GoogleLoginResponse {
  code: string;
}

function Login() {
  const [loading, setLoading] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogleLogin(codeResponse),
    flow: "auth-code", // Authorization Code Flow
    ux_mode: "popup",
  });

  const { show } = useAlert();

  async function handleGoogleLogin(
    GoogleResponse: GoogleLoginResponse
  ): Promise<void> {
    try {
      const { code } = GoogleResponse;
      setLoading(true);
      await axios.post<BackendLoginResponse>(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/google`,
        { code },
        {
          withCredentials: true,
        }
      );
      window.location.href = "/dashboard";
    } catch (err: any) {
      show("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-6">
      <div className="backdrop-blur-lg rounded-xl shadow-xl p-8 w-full max-w-md bg-white/5 border border-white/10 transition-all duration-300 py-10">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-semibold text-slate-100">Welcome</h1>
            <p className="text-sm text-slate-400">
              Sign in or create your Account
            </p>
          </div>

          {/* Custom Google Login Button */}
          <button
            onClick={() => login()}
            className="w-full bg-sky-50 text-black py-4 rounded-lg  hover:bg-sky-100 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-6 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="26"
              height="26"
            >
              <path
                fill="bg-black"
                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
              />
            </svg>
            <span className="text-md font-bold">Sign in with Google</span>
          </button>
          <p className="text-xs text-center text-slate-500 mt-2 px-4">
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
