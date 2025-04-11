import { useState } from "react";
import BackToHome from "../components/BackToHome";
import axios from "axios";
import Loading from "../components/Loading";
import { useAlert } from "../Context/AlertContext";

export default function AddLink() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const { show } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!link) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/save`,
        {
          link,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to save the link");
      }

      show("Link saved successfully!");
    } catch (err: any) {
      show(err.response?.data?.message);
    } finally {
      setLink("");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 w-full">
      <div className="flex justify-between items-center mb-12 sm:flex-row flex-col gap-8 sm:gap-0">
        <h1 className="text-4xl font-bold text-sky-200">Save Content</h1>
        <BackToHome />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        <form className="w-full space-y-8" onSubmit={handleSubmit}>
          <div className="flex gap-4 w-full flex-col sm:flex-row items-center justify-center">
            <input
              type="text"
              placeholder="Paste URL here..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="w-full px-6 py-5 rounded-xl bg-[#141415] border-2 border-white/10 focus:outline-none focus:border-sky-200/30 placeholder-gray-500 text-lg"
            />
            <button
              className="px-10 py-5 bg-sky-100 hover:bg-sky-100/95 rounded-xl font-semibold transition-colors flex items-center gap-3 cursor-pointer active:scale-95 sm:w-max w-full justify-center text-black"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              <span>Save</span>
            </button>
          </div>

          <p className="text-gray-400 text-center mt-6">
            Enter any webpage URL to archive its content permanently
          </p>
        </form>
      </div>
    </div>
  );
}
