import { internalAccessApi, masterScreenApi, roleApi } from "@/api/list.api";
import { asyncGet, asyncPost } from "@/api/rest.api";
import { ButtonGroup } from "@/components/buttongroup";
import MainLayout from "@/components/mainlayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoMdArrowBack } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const index = () => {
  const [screenList, setScreenList] = useState([]);
  const [onScreenList, setOnScreenList] = useState<any[]>([]);
  const [screenModules, SetScreenMoudles] = useState<any[]>([]);
  const [selectedScreenOption, setSelectedScreenOption] = useState<any>();
  const router = useRouter();
  const [role, setRole] = useState<any>();
  const [deleteAlreadyActiveScreenList, setDeleteAlreadyActiveScreenList] =
    useState<any>();

  const removeAlreadyActiveScreen = async (id: any) => {
    alert("delete");
  };

  const roleHeader = async () => {
    const { data, error } = await asyncGet(
      roleApi.get + "/" + router?.query.role_id
    );
    if (data && !error) {
      setRole(data);
    } else {
      console.log(error);
    }
  };

  const addOnScreenList = (id: any) => {
    const findScreen = screenList.find((f) => f.id == id);
    console.log(findScreen);
    console.log(id);
    setOnScreenList((s) => [...s.filter((f) => f.id !== id), findScreen]);
  };
  const getScreen = async () => {
    const { data, error } = await asyncGet(masterScreenApi.get);
    if (data && !error) {
      setScreenList(data);
    } else {
      console.log(error);
    }
  };

  const getScreenModule = async (id: any) => {
    // alert("fetching Module");
    const { data, error } = await asyncGet(
      masterScreenApi.get + "/" + id + "/" + router?.query?.role_id
    );
    if (data && !error) {
      SetScreenMoudles(data?.details);
      setSelectedScreenOption(id);
    } else console.log(error);
  };

  const getAleradyActiveScreenList = async () => {
    //api call
    const { data, error } = await asyncGet(
      internalAccessApi.get + "/" + router?.query.role_id
    );
    if (data && !error) {
      setOnScreenList(data);
    } else {
      console.log(error);
    }

    // set setOnScreenList
  };
  useEffect(() => {
    getScreen();
    getAleradyActiveScreenList();
    roleHeader();
  }, [router?.isReady]);

  return (
    <MainLayout>
      <div className="container    h-[84vh] grid gap-[1px]">
        <div className="p-5 h-[10vh] bg-white flex justify-between ">
          {" "}
          <div className="  font-bold ">{role?.name}</div>
          <Link
            href={"/role"}
            className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline flex"
          >
            <IoMdArrowBack className="mt-1" />
            <span>Back To Role List</span>
          </Link>
        </div>
        <div className="h-[74vh] flex gap-[2px] ">
          <div className="w-[30%] bg-white">
            <div className="grid">
              <select
                onChange={(e) => addOnScreenList(e.target.value)}
                name=""
                id=""
                className="w-full px-4 py-4 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
              >
                <option disabled selected className="text-gray-500">
                  Select Screen
                </option>
                {screenList.map((m: any, i) => (
                  <option
                    onClick={() => alert(m.name)}
                    key={i}
                    value={m.id}
                    className="text-gray-800"
                  >
                    {m.name}
                  </option>
                ))}
              </select>
              <div className="p-4 ">
                <ul className="">
                  {onScreenList.map((m, i) => (
                    <li
                      onClick={() => getScreenModule(m.id)}
                      key={i}
                      className={`  flex justify-between  h-10 ${
                        selectedScreenOption == m.id && "bg-gray-100"
                      } hover:bg-gray-100 px-4 py-2 cursor-pointer`}
                    >
                      <span> {m.name}</span>{" "}
                      <ButtonGroup
                        isDelete
                        onDelete={(e) => {
                          e.stopPropagation();
                          removeAlreadyActiveScreen();
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-[70%]  p1  bg-white">
            <div className="w-full bg-white h-14 p-3 border border-b-1 grid gap-5">
              <span>Modules</span>
              {/* {JSON.stringify(screenModules)} */}
              <div className=" ">
                <ul className="py-4 grid grid-cols-1 gap-2">
                  {/* {JSON.stringify(selectedScreenOption)} */}
                  {Array.isArray(screenModules) &&
                    screenModules?.map((m, i) => {
                      return (
                        <Card
                          fetch={() => getScreenModule(selectedScreenOption)}
                          moduleId={m?.moduleId}
                          key={i}
                          name={m.name}
                          privilege={m.privileges}
                        />
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

const Card = ({
  name,
  fetch,
  privilege,
  moduleId,
}: {
  name: string;
  fetch: () => void;
  privilege: any[];
  moduleId: string;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onCheck = async (check: any, moduleId: any, privilegeId: any) => {
    //roleid
    //moduleId
    //priviligeId
    const payload = {
      moduleId,
      privilegeId,
      roleId: router?.query?.role_id,
      action: check ? "create" : "delete",
    };
    const { data, error } = await asyncPost(internalAccessApi.post, payload);
    if (data && !error) {
      fetch();
    } else {
      alert(error?.message);
    }
  };
  return (
    <li className="">
      <span
        onClick={() => setOpen(!open)}
        className=" flex justify-between bg-gray-300 hover:bg-gray-400 items-center p-2"
      >
        <span className="block text-base   ">{name}</span>
        {open ? (
          <MdKeyboardArrowDown size={30} />
        ) : (
          <MdKeyboardArrowRight size={30} />
        )}
      </span>
      {open && (
        <span className=" flex gap-5 justify-start  bg-gray-100 p-2">
          {privilege?.map((_, i) => (
            <span key={i} className="flex mt-2 gap-1 items-center">
              <span className="hover:border-blue-700">
                <input
                  onChange={(e) =>
                    onCheck(
                      e.target?.checked,
                      moduleId,
                      _?.details?.[0]?.priviligeId
                    )
                  }
                  defaultChecked={_?.details?.[0].isActive}
                  type="checkbox"
                />
              </span>
              <span>{_?.name}</span>
            </span>
          ))}
        </span>
      )}
    </li>
  );
};
