import MainLayout from "@/components/mainlayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../components/modal";
import Button from "@/components/button";
import { ButtonGroup } from "@/components/buttongroup";

const index = () => {
  const [screenList, setScreenList] = useState<any[]>([]);
  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [screen, setScreen] = useState({ name: "", description: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<any | null>(null);

  const openModal = () => {
    setisAddModalOpen(true);
  };

  const closeModal = () => {
    setisAddModalOpen(false);
  };

  const closeEditModal = () => {
    setSelectedScreen(null);
    setIsEditModalOpen(false);
  };
  //Get screens
  const fetchScreen = () => {
    fetch("http://localhost:4005/master-screens")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setScreenList(data);
      })

      .catch((e) => console.error(e));
  };

  //Post Screens
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4005/master-screens", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(screen),
      });
      const responseData = await response.json();

      if (response.ok) {
        window.alert("New Screen has been added");
        setisAddModalOpen(false);
      } else {
        throw responseData;
      }
    } catch (e: any) {
      window.alert(e?.message);
    }
    fetchScreen();
  };

  //Delete Screen
  const deleteScreen = async (id: string) => {
    const ask = window.confirm("Are you sure you want to delete this screen?");
    if (ask == true) {
      fetch(`http://localhost:4005/master-screens/${id}`, {
        method: "DELETE",
      })
        .then(async (res) => {
          if (res.ok) {
            setScreenList((prevScreen) => {
              return prevScreen.filter((screenList) => screenList.id !== id);
            });
          } else {
            throw await res.json();
          }
        })
        .catch((e) => {
          window.alert(e?.message);
        });
    }
  };

  ///Edit Screen

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = fetch(
        `http://localhost:4005/master-screens/${selectedScreen.id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(screen),
        }
      );

      const responseDate = await response;
      if (responseDate.ok) {
        fetchScreen();
        window.alert("The Screen Has been updated!!!");
        setIsEditModalOpen(false);
      } else throw responseDate;

      setisAddModalOpen(false);
      fetchScreen();
    } catch (error: any) {
      throw alert(error?.message);
    }
  };

  useEffect(() => {
    fetchScreen();
  }, []);

  return (
    <MainLayout>
      <div className="items-center w-full px-4   bg-white rounded-lg shadow-md ">
        <div className="container mx-auto">
          <div className=" justify-between w-full px-4 my-5">
            <div className="flex  justify-between">
              <div className="text-lg font-bold">Screen list List</div>

              <button
                onClick={openModal}
                className="px-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
              >
                <FaPlus />
              </button>
              <Modal isOpen={isAddModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                  <div className="justify-center-">
                    <h1>Add Screen</h1>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="roleInput"
                    >
                      Screen:
                    </label>
                    <input
                      type="text"
                      id="roleInput"
                      name="screen"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter Screen"
                      onChange={(e) => {
                        setScreen((r) => {
                          return { ...r, name: e.target.value };
                        });
                      }}
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter description"
                      onChange={(e) => {
                        setScreen((r) => {
                          return { ...r, description: e.target.value };
                        });
                      }}
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
                <thead className="font-bold font-sans">
                  <tr className="text-base font-bold text-left bg-gray-50">
                    <th className="px-4 py-3 border-b-2 border-blue-500">
                      S.No.
                    </th>
                    <th className="px-4 py-3 border-b-2 border-green-500">
                      Screen Names
                    </th>
                    <th className="px-4 py-3 border-b-2 border-purple-900">
                      Descriptions
                    </th>
                    <th className="px-4 py-3 border-b-2 border-red-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {screenList.map((m, i) => (
                    <tr
                      key={i}
                      className="py-10 border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="flex flex-row items-center px-4 py-4">
                        {i + 1}
                      </td>
                      <td className="px-4 py-4">{m.name}</td>
                      <td className="px-4 py-4">{m.description}</td>
                      <td>
                        <div className="gap-1 flex items-center">
                          {/* <Link
                            key={i}
                            onClick={() => deleteScreen(m?.id)}
                            href={"#"}
                            className="text-white"
                          >
                            <div className="px-2 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
                              <CiTrash />
                            </div>
                          </Link>

                          <button
                            onClick={() => {
                              setIsEditModalOpen(true);
                              setSelectedScreen(m);
                            }}
                            className="px-2 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                          >
                            <FaRegEdit />
                          </button> */}
                          <ButtonGroup
                            onDelete={() => deleteScreen(m?.id)}
                            onEdit={() => {
                              setIsEditModalOpen(true);
                              setSelectedScreen(m);
                            }}
                            isDelete
                            isEdit
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isEditModalOpen && selectedScreen && (
              <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="roleInput"
                    >
                      Screen:
                    </label>
                    <input
                      type="text"
                      id="roleInput"
                      name="role"
                      defaultValue={selectedScreen?.name}
                      onChange={(e) =>
                        setScreen((r) => {
                          return { ...r, name: e.target.value };
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter Screen"
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
                      defaultValue={selectedScreen?.description}
                      onChange={(e) => {
                        setScreen((r) => {
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;
