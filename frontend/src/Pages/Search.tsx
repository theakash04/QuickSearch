import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router";
import BackToHome from "../components/BackToHome";
import Loading from "../components/Loading";
import { useAlert } from "../Context/AlertContext";

interface searchResult {
  id: number;
  title: string;
  url: string;
  content?: string;
  summery: string;
}

interface SearchResponse {
  results: searchResult[];
}

export default function Search() {
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [_searchParam, setSearchParam] = useSearchParams();
  const { show } = useAlert();

  const fetchResults = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await axios.get<SearchResponse>(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/search`,
        {
          withCredentials: true,
          params: { query: searchTerm },
        }
      );

      if (response.status === 200) {
        setSearchResults(response.data?.results.flat());
      }
    } catch (error: any) {
      show(
        error.response?.data?.message ||
          "An error occurred while fetching results."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParam({ query });
    fetchResults(query);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 w-full h-full py-10">
      <div className="flex w-full justify-center sm:justify-between gap-5 sm:gap-0 items-center mb-12 sm:flex-row flex-col sm:px-8 px-0">
        <h1 className="text-4xl font-bold sm:text-start text-center text-sky-200">
          Search Content
        </h1>
        <BackToHome />
      </div>

      <div className="flex flex-col items-center min-h-[60vh]">
        <div className="w-full max-w-5xl space-y-8">
          <form
            className="flex gap-4 w-full flex-col sm:flex-row items-center justify-center"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search by keywords or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
              className="w-full px-6 py-5 rounded-xl bg-[#141415] border-2 border-white/10 focus:outline-none focus:border-sky-200/30 placeholder-white/60 text-lg"
            />
            <button
              className="px-10 py-5 bg-sky-100 hover:bg-sky-100/95 rounded-xl transition-colors flex items-center gap-3 cursor-pointer active:scale-95 justify-center sm:w-max w-full text-black font-bold"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search</span>
            </button>
          </form>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-6 bg-[#141415] rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="pt-1 text-sky-200">
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
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-100 mb-2">
                        {result.title}
                      </h3>
                      <a
                        href={result.url}
                        className="text-blue-400 hover:text-blue-300 text-sm mb-3 inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.url}
                      </a>
                      <p className="text-gray-400 line-clamp-5">
                        {result.summery}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-8 rounded-2xl mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-sky-100/70"
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
              </div>
              <p className="text-gray-400 text-lg">
                No results found. Try searching with different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
