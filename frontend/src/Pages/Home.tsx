import { Link } from "react-router";

export default function Home() {
  return (
    <div className="w-full mx-auto py-10 relative">
      <div className="flex flex-col items-center justify-center gap-8 mb-12">
        <h1 className="text-5xl sm:text-6xl font-bold text-center text-sky-200">
          QuickFind
        </h1>
        <div className="text-center sm:text-xl text-gray-300 mb-8 px-3">
          <p className="font-extrabold text-xl sm:text-2xl pb-2">
            Turn Any Link into Smart, Searchable Knowledge – Instantly{" "}
          </p>
          <p className="text-md sm:text-lg flex sm:flex-row flex-col items-center justify-center gap-0 sm:gap-4">
            <span className="flex items-center gap-2">
              <img src="/paste.svg" alt="paste" width={20} />
              Paste a URL
            </span>
            <span className="flex items-center gap-2">
              <img src="/result.svg" alt="result" width={20} />
              Get Instant Results
            </span>
            <span className="flex items-center gap-2">
              <img src="/save.svg" alt="save" width={20} />
              Save for Later
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-4">
        <div className="flex gap-4 w-full sm:flex-row flex-col items-center justify-center">
          <Link to={"/login"}>
            <button className="group w-full px-8 py-5 bg-sky-100 hover:bg-sky-100/95 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg active:scale-95 cursor-pointer">
              <div className="flex items-center justify-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="bg-sky-100"
                >
                  <path d="M480-380Zm80 220H260q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q106 0 184.5 68.5T757-560q-21 0-40.5 4.5T679-543q-8-75-65-126t-134-51q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h300v80Zm120 0q-17 0-28.5-11.5T640-200v-120q0-17 11.5-28.5T680-360v-40q0-33 23.5-56.5T760-480q33 0 56.5 23.5T840-400v40q17 0 28.5 11.5T880-320v120q0 17-11.5 28.5T840-160H680Zm40-200h80v-40q0-17-11.5-28.5T760-440q-17 0-28.5 11.5T720-400v40Z" />
                </svg>
                <span className="text-black">Set Up Your Space</span>
              </div>
            </button>
          </Link>
        </div>

        <div className="mt-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Feature Card 1 */}
            <div className="p-6 border border-sky-200/20 rounded-xl bg-gray-900/10 hover:border-sky-200/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 19V5a2 2 0 012-2h10a2 2 0 012 2v14l-7-3.5L5 19z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-sky-200 mb-2">
                    Smart Archiving
                  </h3>
                  <p className="text-gray-300">
                    Permanent storage of webpage content with automatic text
                    extraction and preservation
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 border border-sky-200/20 rounded-xl bg-gray-900/10 hover:border-sky-200/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sky-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-sky-200 mb-2">
                    AI Summarization
                  </h3>
                  <p className="text-gray-300">
                    Generate concise summaries of saved content using advanced
                    AI models.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 border border-sky-200/20 rounded-xl bg-gray-900/10 hover:border-sky-200/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-sky-200 mb-2">
                    Instant Results
                  </h3>
                  <p className="text-gray-300">
                    Blazing fast search performance powered by optimized
                    indexing and cloud infrastructure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-16 absolute -bottom-48 w-full">
        <h2 className="text-sm font-bold text-sky-200 mb-8 flex items-center gap-2">
          &copy; 2025
          <a href="https://github.com/theakash04">QuickFind.</a> All rights
          reserved.
        </h2>
      </div>
    </div>
  );
}
