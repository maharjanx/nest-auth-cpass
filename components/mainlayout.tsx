import Link from "next/link";
import { useRouter } from "next/router";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaCircleUser, FaEye, FaScroll } from "react-icons/fa6";
import { GoFileSubmodule } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineScreenshotMonitor } from "react-icons/md";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebarBarData = [
    {
      icon: <LuLayoutDashboard />,
      name: "Dashboard",
      url: "/",
    },
    {
      icon: <FaCircleUser />,
      name: "User",
      url: "/user",
    },
    {
      icon: <MdOutlineScreenshotMonitor />,
      name: "Screen",
      url: "/screen",
    },
    {
      icon: <FaScroll />,
      name: "Role",
      url: "/role",
    },
    {
      icon: <FaEye />,
      name: "Privilege",
      url: "/privilege",
    },
    {
      icon: <GoFileSubmodule />,
      name: "Module",
      url: "/module",
    },
    {
      icon: <GoFileSubmodule />,
      name: "Form",
      url: "/form",
    },
  ];
  const router = useRouter();
  return (
    <div className="flex ">
      <div className="w-[20%] z-20 fixed min-h-screen border p-5 bg-gray-900 text-white">
        <div className="flex items-center gap-5">
          <h3 className="text-lg font-bold flex gap-4 items-center">
            <BiLogoVisualStudio size={40} />
            <span> Next Auth Admin</span>
          </h3>
        </div>
        <ul className=" mt-10 grid gap-2 grid-cols-1">
          {sidebarBarData.map((m, i) => {
            return (
              <Link key={i} href={m.url}>
                <li
                  className={` ${
                    router?.asPath == m?.url && "bg-slate-500"
                  } hover:bg-slate-500 p-2 px-5 cursor-pointer text-lg flex items-center gap-4 `}
                >
                  {m.icon}
                  {m.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className=" border w-full ">
        <nav className="fixed left-0 right-0 z-10 bg-white  shadow-md flex justify-end p-2 py-3 ">
          <div className="flex items-center gap-5">
            <span className="border rounded-full px-3.5 bg-gray-300 py-2">
              U
            </span>
            <h2>Anish maharjan</h2>
          </div>
        </nav>
        <div className="p-5 mt-16 ml-[19rem] bg-slate-300 ">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
