import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen ">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
        <div className="text-center space-y-8 max-w-2xl">
          {/* Animated 404 Number */}
          <div className="relative">
            <div className="text-[10rem] md:text-[15rem] font-bold text-gray-800 opacity-50">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                404
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100">
              Lost in the Digital Void
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
              The page you're looking for has drifted into the unknown. Let's
              get you back to safe territory.
            </p>

            {/* Navigation */}
            <Link to={"/"}>
              <div className="flex justify-center gap-4 mt-8">
                <a
                  href="/"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors flex items-center gap-2"
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Return Home
                </a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
