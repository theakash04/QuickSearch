import { useEffect, useState } from "react";
import Container from "./Container";
import { linksTypes } from "../types/user";
import axios from "axios";
import Loading from "./Loading";
import { useAlert } from "../Context/AlertContext";

export default function Links() {
  const [links, setLinks] = useState<linksTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const { show } = useAlert();

  useEffect(() => {
    setLoading(true);
    axios
      .get<{ results: linksTypes[] }>(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/links`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLinks(res.data.results);
        }
        setLoading(false);
      })
      .catch((err) => {
        show(err.response.data.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="relative bg-white/5 border border-white/10 rounded-xl pb-12 p-6 shadow-lg hover:shadow-xl transition-all duration-300 gap-4  w-full max-h-[400px] h-auto overflow-auto overflow-x-hidden">
      {links.length > 0 && (
        <div className="flex items-center justify-between w-full px-4 py-2 text-sm border-b  border-white/30  text-slate-300 ">
          <span className="">Your Saved URLs</span>
          <span className="">{links.length}</span>
        </div>
      )}

      <div className="pb-10 pt-4 w-full h-full flex flex-col gap-4">
        {[...links].reverse().map((link) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={link.id}
            className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 gap-2 flex flex-col hover:bg-white/10 hover:border-white/30 last:mb-10"
          >
            <p className="text-slate-300 truncate">{link.title}</p>
            <p className="text-slate-400 text-xs">
              Created: {new Date(link.createdAt).toLocaleString()}
            </p>
          </a>
        ))}
        {links.length === 0 && !loading && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-slate-300 text-center">No links available.</p>
          </div>
        )}

        {loading && <Loading />}
      </div>
    </Container>
  );
}
