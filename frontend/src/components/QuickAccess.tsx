import { Link } from "react-router";
import Container from "./Container";

export default function QuickAccess() {
  return (
    <Container className="gap-5">
      <h2 className="text-xl font-semibold text-slate-100 mb-2">QuickAccess</h2>
      <div className="gap-4 flex flex-col">
        <Link to={"/add"}>
          <button className="group w-full px-8 py-5 bg-sky-100 hover:bg-sky-100/95 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg active:scale-95 cursor-pointer">
            <div className="flex items-center justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-black">Save New URL</span>
            </div>
          </button>
        </Link>

        <Link to={"/search"}>
          <button className="group w-full px-8 py-5 border-2 border-sky-200/40 hover:border-sky-200/60 bg-sky-200/5 hover:bg-sky-200/0 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg  active:scale-95 cursor-pointer">
            <div className="flex items-center justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-sky-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-sky-200">Search Content</span>
            </div>
          </button>
        </Link>
      </div>
    </Container>
  );
}