import Links from "../components/Links";
import Navbar from "../components/Navbar";
import QuickAccess from "../components/QuickAccess";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-start w-screen min-h-screen py-5 px-4 gap-14">
      <Navbar />
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl text-center font-bold text-slate-100 mb-10">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <QuickAccess />
          <Links />
        </div>
      </div>
    </div>
  );
}
