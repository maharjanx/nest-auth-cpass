import MainLayout from "@/components/mainlayout";
import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { CiTrash } from "react-icons/ci";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import Button from "@/components/button";
import { ButtonGroup } from "@/components/buttongroup";
import { useRouter } from "next/router";

const index: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [roleList, setRoleList] = useState<any[]>([]);
  const [role, setRoles] = useState({ name: "", description: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);

  //create Role
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4005/role", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(role),
      });
      const responseData = await response.json();

      if (response.ok) {
        window.alert("Role has been added");
        setModalOpen(false);
      } else {
        throw responseData;
      }
    } catch (e: any) {
      window.alert(e?.message);
    }
    fetchRoleList();
  };

  //get Roles
  const fetchRoleList = () => {
    fetch("http://localhost:4005/role")
      .then((res) => res.json())
      .then((data) => {
        setRoleList(data);
      })
      .catch((e) => console.log(e));
  };

  //delete Roles
  const deleteRole = async (id: string) => {
    const ask = window.confirm("Are you sure to delete this role?");
    console.log(ask);
    console.log("render .....................");
    if (ask == true) {
      fetch(`http://localhost:4005/role/${id}`, {
        method: "DELETE",
      })
        .then(async (res) => {
          if (res.ok) {
            setRoleList((prevRoles) =>
              prevRoles.filter((roleList) => roleList.id !== id)
            );
          } else {
            throw await res.json();
          }
        })
        .catch((c) => {
          window.alert(c?.message);
        });
    }
    // .then((d) => {

    // })
    // .catch((e) => console.log("asdddddddddddddddddd"));
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeEditModal = () => {
    setSelectedRole(null);
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = fetch(`http://localhost:4005/role/${selectedRole.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(role),
      });

      const responseData = await response;
      if (responseData.ok) {
        fetchRoleList();
        window.alert("The Role Has Been Updated");
        setIsEditModalOpen(false);
      } else {
        throw responseData;
      }
      setIsEditModalOpen(false);
      fetchRoleList();
    } catch (error: any) {
      console.log(error);
      throw alert(error?.message);
    }
  };

  useEffect(() => {
    if (selectedRole) {
      setRoles({
        name: selectedRole?.name,
        description: selectedRole?.description,
      });
    }
  }, [selectedRole, Modal]);
  useEffect(() => {
    fetchRoleList();
  }, []);
  return (
    <MainLayout>
      <div className="items-center w-full px-4   bg-white rounded-lg shadow-md ">
        <div className="container mx-auto">
          <div className="flex justify-between w-full px-4 my-5">
            <div className="text-lg font-bold">Role List</div>
            <Button onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="roleInput"
                  >
                    Role:
                  </label>
                  <input
                    type="text"
                    id="roleInput"
                    name="role"
                    // value={formData.role}
                    onChange={(e) =>
                      setRoles((r) => {
                        return { ...r, name: e.target.value };
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter role"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="descriptionInput"
                  >
                    Description:
                  </label>
                  <textarea
                    id="descriptionInput"
                    name="description"
                    // value={formData.description}
                    onChange={(e) => {
                      setRoles((r) => {
                        return { ...r, description: e.target.value };
                      });
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter description"
                    rows={4}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Modal>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border border-collapse table-auto mt-0">
              <thead className="">
                <tr className="text-base font-bold text-left bg-gray-50">
                  <th className="px-4 py-3 border-b-2 border-blue-500">
                    S.No.
                  </th>
                  <th className="px-4 py-3 border-b-2 border-green-500">
                    Names
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
                {roleList.map((m, i) => (
                  <tr
                    key={i}
                    className="py-10 border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="flex flex-row items-center px-4 py-4">
                      {i + 1}
                    </td>
                    <td className="px-4 py-4">{m.name}</td>
                    <td className="px-4 py-4">{m.description}</td>
                    <td className="px-4 py-4">
                      <div className="gap-1 flex items-center">
                        <ButtonGroup
                          isDelete
                          onDelete={() => deleteRole(m?.id)}
                          isEdit
                          onEdit={() => {
                            setSelectedRole(m);
                            setIsEditModalOpen(true);
                          }}
                          isConfigure
                          onConfigure={() => {
                            router.push(`/role/configure/${m.id}`);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditModalOpen && selectedRole && (
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="roleInput"
                  >
                    Role:
                  </label>
                  <input
                    type="text"
                    id="roleInput"
                    name="role"
                    defaultValue={selectedRole?.name}
                    onChange={(e) =>
                      setRoles((r) => {
                        return { ...r, name: e.target.value };
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter role"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="descriptionInput"
                  >
                    Description:
                  </label>
                  <textarea
                    id="descriptionInput"
                    name="description"
                    defaultValue={selectedRole?.description}
                    onChange={(e) => {
                      setRoles((r) => {
                        return {
                          ...r,
                          description: e.target.value,
                        };
                      });
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter description"
                    rows={4}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                </div>
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
