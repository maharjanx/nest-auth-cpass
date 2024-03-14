import Button from "@/components/button";
import { ButtonGroup } from "@/components/buttongroup";
import MainLayout from "@/components/mainlayout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash, FaUserPlus } from "react-icons/fa6";

const index = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const fecthUserList = () => {
    fetch("http://localhost:4005/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUserList(data);
      });
  };

  const deleteUser = async (id: string) => {
    // delete api
    const ask = window.confirm("are you sure? you want to delete ");
    console.log(ask);
    if (ask) {
      try {
        const response = await fetch(`http://localhost:4005/users/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUserList((prevUsers) =>
            prevUsers.filter((userList) => userList.id !== id)
          );
          fecthUserList();
        } else {
          console.error("Error deleting user:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    fecthUserList();
  }, []);
  return (
    <MainLayout>
      {/* {JSON.stringify(editUser)} */}
      <div className="flex justify-between mb-3 items-center"></div>

      {
        <div className="items-center w-full px-4   bg-white rounded-lg shadow-md ">
          <div className="container mx-auto">
            <div className="flex justify-between w-full px-4">
              <div className="mt-3 text-lg font-bold">User List</div>
              <Button
                icon={<FaUserPlus />}
                name="Add User"
                onClick={() => router.push("/user/create")}
              />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border border-collapse table-auto overflow-scroll">
                <thead className="">
                  <tr className="text-base font-bold text-left bg-gray-50">
                    <th className="px-4 py-3 border-b-2 border-blue-500">
                      Full Name
                    </th>
                    <th className="px-4 py-3 border-b-2 border-green-500">
                      Email
                    </th>
                    <th className="px-4 py-3 border-b-2 border-red-500">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-center border-b-2 border-yellow-500 sm:text-left">
                      Address
                    </th>
                    <th className="px-4 py-3 text-center border-b-2 border-purple-500 sm:text-left">
                      emp_code
                    </th>
                    <th className="px-4 py-3 text-center border-b-2 border-purple-500 sm:text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {userList.map((m, i) => (
                    <tr
                      key={i}
                      className="py-10 border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="flex flex-row items-center px-4 py-4">
                        <div className="flex w-10 h-10 mr-4">
                          <a href="#" className="relative block">
                            {/* {m?.link} */}
                            <img
                              alt="profil"
                              src={
                                m?.link ??
                                "https://images.unsplash.com/photo-1560329072-17f59dcd30a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBmYWNlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                              }
                              className="object-cover w-10 h-10 mx-auto rounded-md"
                            />
                          </a>
                        </div>
                        <div className="flex-1 pl-1">
                          <div className="font-medium dark:text-gray-600">
                            {m.full_name}
                          </div>
                          <div className="text-sm text-red-600">
                            {m?.roles?.map((m: { name: any }) => m.name).join()}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">{m.email}</td>
                      <td className="px-4 py-4">{m.phone}</td>
                      <td className="px-4 py-4">{m.address}</td>
                      <td className="px-4 py-4">{m.emp_code}</td>
                      <td className="px-4 py-4">
                        <div className="gap-1 flex items-center">
                          <ButtonGroup
                            onDelete={() => deleteUser(m?.id)}
                            onEdit={() => {
                              setModal(true);
                              setEditUser(m);
                            }}
                            isEdit
                            isDelete
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
                Showing&nbsp;<span className="font-bold"> 1 to 4 </span>&nbsp;of
                8 entries
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
      }
      {modal && (
        <Modal
          setModal={setModal}
          editData={editUser}
          fetchUserList={fecthUserList}
        />
      )}
    </MainLayout>
  );
};

export default index;

const Modal = ({
  setModal,
  editData,
  fetchUserList,
}: {
  setModal: any;
  editData: any;
  fetchUserList: () => void;
}) => {
  const [user, setUser] = useState({
    ...editData,
    roleId: editData?.roles?.map((m: any) => m.id),
  });
  const [roleList, setRoleList] = useState<any[]>([]);
  const fetchRoleList = () => {
    fetch("http://localhost:4005/role")
      .then((resp) => resp.json())
      .then((data) => {
        setRoleList(data);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("full_name", user.full_name);
    form.append("address", user.address);
    form.append("phone", user.phone);
    form.append("password", user.password);
    form.append("emp_code", user.emp_code);
    form.append("email", user.email);
    form.append("file", user.file);
    user.roleId.forEach((e) => {
      form.append("roleId[]", e);
    });
    try {
      const response = await fetch(
        `http://localhost:4005/users/${editData?.id}`,
        {
          method: "PATCH",
          body: form,
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      setModal(false);
      fetchUserList();
    } catch (e) {
      throw new Error("Unable to submit");
    }
  };

  useEffect(() => {
    fetchRoleList();
  }, []);
  return (
    <div className="fixed z-20 bg-gray-800 bg-opacity-50 rounded-md shadow-md inset-0 min-h-[50vh]">
      <button
        onClick={() => setModal(false)}
        className="fixed right-0 top-0 p-3 text-red-600 "
      >
        <FaTrash size={30} />
      </button>
      <div className=" text-white  mt-7   flex  justify-center  ">
        <div className=" border w-[50%]  bg-white p-5 rounded-md ">
          {/* {JSON.stringify(editData)} */}
          {/* <h1 className="text-black">{JSON.stringify(user)}</h1> */}
          <div>
            <div className="mb-5">
              <h1 className="text-black underline">Edit User</h1>
            </div>
            <form
              action="#"
              method="post"
              className="grid grid-cols-2  text-black gap-3"
              onSubmit={handleSubmit}
            >
              <div className="text-black">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 font-bold mb-2 "
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  defaultValue={editData?.full_name}
                  className="w-full px-3 py-2 border border-gray-500   rounded-sm"
                  onChange={(e) => {
                    setUser((u) => {
                      return { ...u, full_name: e.target.value };
                    });
                  }}
                />
              </div>

              <div className="">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={editData?.email}
                  className="w-full px-3 py-2 border rounded-sm  border-gray-500"
                  onChange={(e) => {
                    setUser((u) => {
                      return { ...u, email: e.target.value };
                    });
                  }}
                />
              </div>

              <div className="">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={editData?.phone}
                  className="w-full px-3 py-2 border rounded-sm border-gray-500"
                  onChange={(e) => {
                    setUser((u) => {
                      return { ...u, phone: e.target.value };
                    });
                  }}
                />
              </div>

              <div className="">
                <label
                  htmlFor="empCode"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Employee Code
                </label>
                <input
                  type="text"
                  id="empCode"
                  name="empCode"
                  defaultValue={editData.emp_code}
                  className="w-full px-3 py-2 border rounded-sm border-gray-500"
                  onChange={(e) => {
                    setUser((u) => {
                      return { ...u, emp_code: e.target.value };
                    });
                  }}
                />
              </div>

              <div className="">
                <label
                  htmlFor="photoId"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Photo ID
                </label>
                <input
                  type="file"
                  id="photoId"
                  name="photoId"
                  className="w-full px-3 py-2 border rounded-sm border-gray-500"
                  onChange={(e) => {
                    console.log(e.target?.files);
                    setUser((u) => {
                      return { ...u, file: e.target.files[0] as any };
                    });
                  }}
                />
              </div>

              <div className="">
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={4}
                  defaultValue={editData.address}
                  className="w-full px-3 py-2 border rounded-sm border-gray-500"
                  onChange={(e) => {
                    setUser((u: any) => {
                      return { ...u, address: e.target.value };
                    });
                  }}
                ></textarea>
              </div>

              <div className="">
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  multiple
                  className="w-full px-3 py-2 border rounded-sm border-gray-500"
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions,
                      (options) => options.value
                    );
                    setUser((u: any) => {
                      return { ...u, roleId: selectedOptions };
                    });
                  }}
                >
                  {roleList?.map((m, i) => {
                    return (
                      <option
                        key={i}
                        selected={editData?.roles
                          ?.map((m: any) => m?.id)
                          .includes(m?.id)}
                        value={m?.id}
                      >
                        {m?.name}
                      </option>
                    );
                  })}
                  {/* Add more role options as needed */}
                </select>
              </div>
              {/* {JSON.stringify(user)} */}
              <div className="col-span-2 flex justify-end mt-5">
                <button
                  type="submit"
                  className="bg-blue-500 col-span-2 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
