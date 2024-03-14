import { masterModuleApi, masterScreenApi, privilegeApi } from "@/api/list.api";
import { asyncGet, asyncPatch, asyncPost } from "@/api/rest.api";
import MainLayout from "@/components/mainlayout";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../components/modal";
import Link from "next/link";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import Button from "@/components/button";
import { ButtonGroup } from "@/components/buttongroup";
import { ModulePriviligeFormField } from "@/interface/interface";
import { Method } from "@/interface/enum";
import { join } from "path";
import { useRouter } from "next/router";

function index() {
  const [method, setMethod] = useState<"add" | "edit">("add");
  const [moduleList, setModuleList] = useState<any>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedModule, SetSelectedModule] = useState<any | null>(null);

  const getById = async (m: any) => {
    const { data, error } = await asyncGet(
      masterModuleApi.get + "/" + m?.masterModuleId
    );
    console.log(data);
    if (data && !error) {
      SetSelectedModule(data?.[0]);
      setModalOpen(true);
      setMethod("edit");
    }
  };

  const fetchModuleData = async () => {
    const { data, error } = await asyncGet(masterModuleApi.get);
    if (data && !error) {
      setModuleList(data);
    } else {
      console.log(error);
    }
  };

  const openModal = () => {
    setMethod("add");
    SetSelectedModule({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {};
  useEffect(() => {
    fetchModuleData();
  }, []);
  const [toggle, setToggle] = useState(true);
  return (
    <MainLayout>
      {/* {JSON.stringify(moduleList)} */}

      <div className="items-center w-full px-4   bg-white rounded-lg shadow-md ">
        <div className="container mx-auto">
          <div className="flex justify-between w-full px-4 my-5">
            <div className="text-lg font-bold">Role List</div>

            {/* <button
              onClick={() => setToggle((t) => !t)}
              className={`${
                toggle ? "bg-green-500" : "bg-red-600"
              }  p-2  text-white rounded-md`}
            >
              {toggle ? "On" : "Off"}
            </button> */}

            <Button onClick={openModal} />
          </div>

          <div className="mt-6 ">
            <table className="w-full border relative border-collapse overflow-scroll h-10 table-auto mt-0 font-sans">
              <thead className="sticky top-16 inset-0">
                <tr className="text-base font-bold text-left bg-gray-50">
                  <th className="px-4 py-3 border-b-2 border-blue-500">
                    S.No.
                  </th>
                  <th className="px-4 py-3 border-b-2 border-yellow-500">
                    Module name
                  </th>
                  <th className="px-4 py-3 border-b-2 border-green-500">
                    Module Code
                  </th>
                  <th className="px-4 py-3 border-b-2 border-green-500">
                    Screen Name
                  </th>
                  <th className="px-4 py-3 border-b-2 border-red-500">
                    Privileges
                  </th>
                  <th className="px-4 py-3 border-b-2 border-purple-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700">
                {moduleList?.map((m: any, i: any) => (
                  <tr
                    key={i}
                    className=" py-10 border-b border-gray-200 hover:bg-gray-100 "
                  >
                    <td className="flex flex-row items-center px-4 py-4">
                      {i + 1}
                    </td>
                    <td className="px-4 py-4">{m.masterModuleName}</td>
                    <td className="px-4 py-4">{m.masterModuleShortName}</td>
                    <td className="px-4 py-4">{m.masterScreenName}</td>
                    <td className="px-4 py-4 flex gap-2">
                      {m.privligeDetails?.map((pName: any, index: number) => (
                        <span
                          className="p-2 bg-blue-400 text-white rounded-full font-sans"
                          key={index}
                        >
                          {pName.name}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-4">
                      <div className="gap-1 flex items-center">
                        <ButtonGroup
                          isDelete
                          isEdit
                          onEdit={() => getById(m)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
            <p className="flex">
              Showing&nbsp;<span className="font-bold"> 1 to 4 </span>&nbsp;of 8
              entries
            </p>
            <div className="flex items-center justify-between space-x-2">
              <a href="#" className="hover:text-gray-600">
                Previous
              </a>
              <div className="flex flex-row space-x-1">
                <div className="flex px-2 py-px text-white bg-blue-400 border border-blue-400">
                  1
                </div>
                <div className="flex px-2 py-px border border-blue-400 hover:bg-blue-400 hover:text-white">
                  2
                </div>
              </div>
              <a href="#" className="hover:text-gray-600">
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
      {(method == "edit" ? (selectedModule ? true : false) : true) && (
        <EditAndAdd
          fetch={fetchModuleData}
          isModalOpen={isModalOpen}
          setModal={setModalOpen}
          editData={selectedModule}
        />
      )}
    </MainLayout>
  );
}

export default index;

const EditAndAdd = ({
  editData,
  isModalOpen,
  setModal,
  fetch,
}: {
  editData: any;
  isModalOpen: any;
  setModal: any;
  fetch: () => void;
}) => {
  const [form, setForm] = useState<ModulePriviligeFormField>({
    privileges: [],
  }); //form field
  const [screenList, setScreenList] = useState([]); // screen list comes from api
  const [priviligeList, setPriviligeList] = useState([]); // previligee list comes from privilige api
  const [selectedModule, SetSelectedModule] = useState<any | null>(null);

  const fetchScreen = async () => {
    const { data, error } = await asyncGet(masterScreenApi.get);
    if (data && !error) {
      setScreenList(data);
    } else {
      console.log(error);
    }
  };
  const fetchPriviligeList = async () => {
    const { data, error } = await asyncGet(privilegeApi.get);
    if (data && !error) {
      setPriviligeList(data);
    } else {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (editData) {
      const { data, error } = await asyncPatch(
        masterModuleApi.post + "/" + editData?.masterModuleId,
        form
      );
      handleState(data, error);
    } else {
      const { data, error } = await asyncPost(masterModuleApi.post, form);
      handleState(data, error);
    }
  };

  const handleState = (data, error) => {
    if (data && !error) {
      alert("success");
      setForm({});
      setModal(false);
      fetch();
    } else {
      alert(error?.message);
    }
  };
  useEffect(() => {
    fetchPriviligeList();
    fetchScreen();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm((f) => {
        return {
          moduleName: editData?.masterModuleName,
          description: editData?.description,
          privileges: editData?.privileges?.map((m, i) => {
            return { ...m, key: i + 1 };
          }),
        };
      });
    }
  }, [editData]);

  const deletePrivilige = (index: number) => {
    setForm((f) => {
      return {
        ...f,
        privileges: f?.privileges?.filter((fi) => fi.key != index),
      };
    });
  };

  const addPriviligeField = () => {
    const find = () => {
      if (form.privileges?.length == 0) {
        return 1;
      } else {
        const length = form.privileges?.length || 0;
        const last: any = form?.privileges?.[length - 1];
        return last?.key + 1;
      }
    };

    const rawForm = {
      key: find(),
      privilegeId: "",
      method: "",
      url: "",
    };
    setForm((f) => {
      return { ...f, privileges: [...(f?.privileges || ([] as any)), rawForm] };
    });
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setModal(false)}
      className="!bg-gray-200 md:!max-w-4xl"
    >
      {JSON.stringify(
        form.privileges?.sort((a, b) => (a.key > b.key ? 1 : -1))
      )}
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Module Details</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="screenName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Screen Code:
            </label>

            <div className="relative inline-block w-48 text-gray-700">
              <select
                onChange={(e) => {
                  setForm((f) => {
                    return { ...f, master_screen_id: e.target.value };
                  });
                }}
                className="w-full h-10 pl-3 pr-10 text-base leading-6 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="" disabled selected>
                  Select screen
                </option>
                {screenList?.map((m: any, i: number) => {
                  return (
                    <option
                      selected={editData?.masterScreenId == m.id}
                      key={i}
                      value={m.id}
                    >
                      {m.name}
                    </option>
                  );
                })}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="mb-4">
              <label
                htmlFor="moduleCode"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Module Code:
              </label>
              <input
                defaultValue={editData?.masterModuleShortName}
                onChange={(e) =>
                  setForm((f) => {
                    return {
                      ...f,
                      moduleShortName: e.target.value,
                    };
                  })
                }
                type="text"
                id="privilegeName"
                className="w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="Enter Module ShortName/ codeName"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="moduleName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Module Name:
              </label>
              <input
                defaultValue={editData?.masterModuleName}
                type="text"
                id="shortName"
                className="w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="Enter Module Name..."
                onChange={(e) => {
                  setForm((f) => {
                    return { ...f, moduleName: e.target.value };
                  });
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              defaultValue={editData?.description}
              id="description"
              className="w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              placeholder="Enter Description..."
              onChange={(e) => {
                setForm((f) => {
                  return {
                    ...f,
                    description: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="mb-4   rounded-md">
            <label
              htmlFor="screenName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Privileges:
            </label>

            <div className="grid grid-cols-1 gap-3">
              {form.privileges?.map((_, i) => {
                const findOne = form.privileges?.find((f) => f.key == _.key);
                return (
                  <div key={i} className="flex gap-2 items-center">
                    <div className="relative inline-block w-[25%] text-gray-700">
                      <select
                        onChange={(e) =>
                          setForm((f) => {
                            return {
                              ...f,
                              privileges: [
                                ...(f?.privileges?.filter(
                                  (f) => f.key != _.key
                                ) as any),

                                { ...findOne, privilegeId: e.target.value },
                              ],
                            };
                          })
                        }
                        className="w-full h-10 pl-3 pr-10 text-base leading-6 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                      >
                        <option value="" disabled selected>
                          Select Privileges
                        </option>
                        {priviligeList?.map((m: any, i) => {
                          return (
                            <option
                              selected={_?.privilegeId == m?.id}
                              key={i}
                              value={m.id}
                            >
                              {m.name}
                            </option>
                          );
                        })}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="relative inline-block w-[25%] text-gray-700">
                      <select
                        onChange={(e) =>
                          setForm((f) => {
                            return {
                              ...f,
                              privileges: [
                                ...(f?.privileges?.filter(
                                  (f) => f.key != _.key
                                ) as any),

                                { ...findOne, method: e.target.value },
                              ],
                            };
                          })
                        }
                        className="w-full h-10 pl-3 pr-10 text-base leading-6 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                      >
                        <option value="" disabled selected>
                          Select method
                        </option>
                        {Object.entries(Method).map((m, i) => {
                          return (
                            <option
                              selected={_?.method == m[1]}
                              key={i}
                              value={m[1]}
                            >
                              {m[0]}
                            </option>
                          );
                        })}
                      </select>

                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      defaultValue={_?.url}
                      onChange={(e) =>
                        setForm((f) => {
                          return {
                            ...f,
                            privileges: [
                              ...(f?.privileges?.filter(
                                (f) => f.key != _.key
                              ) as any),
                              { ...findOne, url: e.target.value },
                            ],
                          };
                        })
                      }
                      type="text"
                      id="privilegeName"
                      className="w-[45%] px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                      placeholder="url"
                    />
                    <div className="w-[5%]">
                      <ButtonGroup
                        isDelete
                        onDelete={() => deletePrivilige(_?.key)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => addPriviligeField()}
              type="button"
              className="bg-blue-500 mt-3 text-white px-4 py-2 rounded-md"
            >
              Add Privileges
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};
