import MainLayout from "@/components/mainlayout";
import React, { FC, useEffect, useState } from "react";
import Modal from "../../components/modal";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/button";
import { ButtonGroup } from "@/components/buttongroup";

const index: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [privilegeList, setPrivilegeList] = useState<any[]>([]);
  const [mode, setMode] = useState<"add" | "update">("add");
  const [privilege, setPrivilege] = useState({
    name: "",
    short_name: "",
    privilege_description: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPrivilege, setSelectedPrivilege] = useState<any | null>(null);

  //get privileges
  const fetchPrivilegeList = () => {
    fetch("http://localhost:4005/privilege")
      .then((res) => res.json())
      .then((data) => {
        return setPrivilegeList(data);
      })
      .catch((e) => console.log(e));
  };

  // add privilege
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      privilege.name == "" ||
      privilege.privilege_description == "" ||
      privilege.short_name == ""
    ) {
      window.alert("fieldS cannot be empty");
      return;
    }
    try {
      const response = await fetch("http://localhost:4005/privilege", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(privilege),
      });

      const responseData = await response.json();

      if (response.ok) {
        window.alert("New Privilege has been created");
        setModalOpen(false);
      } else {
        throw responseData;
      }
    } catch (e: any) {
      window.alert(e?.message);
    }
    fetchPrivilegeList();
  };

  //delete privilege

  const deletePrivilege = async (id: string) => {
    const ask = window.confirm("Are you sure to delete this privilege?");
    if (ask == true) {
      fetch(`http://localhost:4005/privilege/${id}`, {
        method: "DELETE",
      })
        .then(async (res) => {
          if (res.ok) {
            setPrivilegeList((prevPrivileges) =>
              prevPrivileges.filter((privilegeList) => privilegeList.id !== id)
            );
          } else throw res.json();
        })
        .catch((e) => {
          window.alert(e?.message);
        });
    }
  };

  //update privilege
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4005/privilege/${selectedPrivilege.id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(privilege),
        }
      );

      if (response.ok) {
        fetchPrivilegeList();
        window.alert("privilege has been updated!!!");
        setIsEditModalOpen(false);
      } else throw response;
      fetchPrivilegeList();
    } catch (e: any) {
      alert(e?.message);
    }
  };

  const openModal = () => {
    setMode("add");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeEditModal = () => {
    setSelectedPrivilege(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    fetchPrivilegeList();
  }, []);

  return (
    <MainLayout>
      <div className="items-center w-full px-4   bg-white rounded-lg shadow-md ">
        <div className="container mx-auto">
          <div className="flex justify-between w-full px-4 my-5">
            <div className="text-lg font-bold">Role List</div>

            <Button name="Add Privilige" onClick={openModal} />
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="modal-content">
              <h2 className="text-2xl font-bold mb-4">Privilege Details</h2>

              <form>
                <div className="mb-4">
                  <label
                    htmlFor="privilegeName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Privilege Name:
                  </label>
                  <input
                    type="text"
                    id="privilegeName"
                    // value={privilege}
                    onChange={(e) => {
                      setPrivilege((p) => {
                        return { ...p, name: e.target.value };
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    placeholder="Enter Privilege Name..."
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="shortName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Short Name:
                  </label>
                  <input
                    type="text"
                    id="shortName"
                    // value={shortName}
                    onChange={(e) =>
                      setPrivilege((p) => {
                        return { ...p, short_name: e.target.value };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    placeholder="Enter Short Name..."
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    // value={description}
                    onChange={(e) =>
                      setPrivilege((p) => {
                        return { ...p, privilege_description: e.target.value };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    placeholder="Enter Description..."
                  />
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
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </form>
            </div>
          </Modal>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border border-collapse table-auto mt-0">
              <thead className="">
                <tr className="text-base font-bold text-left bg-gray-50">
                  <th className="px-4 py-3 border-b-2 border-blue-500">
                    S.No.
                  </th>
                  <th className="px-4 py-3 border-b-2 border-yellow-500">
                    privilege Names
                  </th>
                  <th className="px-4 py-3 border-b-2 border-green-500">
                    Short Name
                  </th>
                  <th className="px-4 py-3 border-b-2 border-red-500">
                    Descriptions
                  </th>
                  <th className="px-4 py-3 border-b-2 border-purple-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700">
                {privilegeList?.map((m, i) => (
                  <tr
                    key={i}
                    className="py-10 border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="flex flex-row items-center px-4 py-4">
                      {i + 1}
                    </td>
                    <td className="px-4 py-4">{m.name}</td>
                    <td className="px-4 py-4">{m.short_name}</td>
                    <td className="px-4 py-4">{m.privilege_description}</td>
                    <td className="px-4 py-4">
                      <ButtonGroup
                        onEdit={() => {
                          setSelectedPrivilege(m);
                          setPrivilege(m);
                          setIsEditModalOpen(true);
                        }}
                        onDelete={() => deletePrivilege(m?.id)}
                        isDelete
                        isEdit
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditModalOpen && selectedPrivilege && (
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="privilegeName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Privilege Name:
                  </label>
                  <input
                    type="text"
                    id="privilegeName"
                    defaultValue={selectedPrivilege?.name}
                    onChange={(e) => {
                      setPrivilege((p) => {
                        return { ...p, name: e.target.value };
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-gray-500 "
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="shortName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Short Name:
                  </label>
                  <input
                    type="text"
                    id="shortName"
                    defaultValue={selectedPrivilege?.short_name}
                    onChange={(e) =>
                      setPrivilege((p) => {
                        return { ...p, short_name: e.target.value };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-gray-500 "
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    defaultValue={selectedPrivilege?.privilege_description}
                    onChange={(e) =>
                      setPrivilege((p) => {
                        return { ...p, privilege_description: e.target.value };
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-gray-500 "
                  />
                </div>

                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </form>
            </Modal>
          )}

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
    </MainLayout>
  );
};

export default index;
