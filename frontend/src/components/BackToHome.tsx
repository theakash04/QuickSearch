import { Link } from "react-router";

export default function BackToHome() {
  return (
    <Link to={"/"}>
      <button className="px-6 py-3 bg-bg-[#141415] hover:border-gray-700/20 rounded-xl transition-colors border border-gray-700/80 flex items-center gap-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Home</span>
      </button>
    </Link>
  );
}
