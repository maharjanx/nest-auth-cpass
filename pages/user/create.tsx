import MainLayout from "@/components/mainlayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const create = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const router = useRouter();
  const [user, setUser] = useState({
    full_name: "",
    address: "",
    phone: "",
    password: "",
    emp_code: "",
    email: "",
    file: null,
    roleId: [""],
  });

  const fetchRole = () => {
    fetch("http://localhost:4005/role")
      .then((res) => res.json())
      .catch((e) => alert("fail to fetch role"))
      .then((data) => {
        setRoles(data);
      });
    //api for role
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
    // const data = new URLSearchParams();
    // for (const pair of form) {
    //   data.append(pair[0], pair[1]);
    // }
    try {
      const response = await fetch("http://localhost:4005/users", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: form,
      });

      const responseData = await response.json();
      console.log(responseData);
      router.push("/user");
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };
  useEffect(() => {
    fetchRole();
  }, []);
  return (
    <MainLayout>
      <div className="max-w-full mx-auto bg-white p-8 border rounded-sm shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add User</h2>
        <form action="#" method="post" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-3 py-2 border rounded-sm"
              onChange={(e) =>
                setUser((u) => {
                  return { ...u, full_name: e.target.value };
                })
              }
            />
          </div>

          <div className="mb-4">
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
              className="w-full px-3 py-2 border rounded-sm"
              onChange={(e) =>
                setUser((u) => {
                  return { ...u, email: e.target.value };
                })
              }
            />
          </div>

          <div className="mb-4">
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
              className="w-full px-3 py-2 border rounded-sm"
              onChange={(e) =>
                setUser((u) => {
                  return { ...u, phone: e.target.value };
                })
              }
            />
          </div>

          <div className="mb-4">
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
              className="w-full px-3 py-2 border rounded-sm"
              onChange={(e) =>
                setUser((u) => {
                  return { ...u, address: e.target.value };
                })
              }
            ></textarea>
          </div>

          <div className="mb-4">
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
              className="w-full px-3 py-2 border rounded-sm"
              onChange={(e) =>
                setUser((u) => {
                  return { ...u, emp_code: e.target.value };
                })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-sm"
              onChange={(e) =>
                setUser((u) => {
                  return { ...u, password: e.target.value };
                })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="photoId"
              className="block text-gray-700 font-bold mb-2"
            >
              Photo ID
            </label>
            <input
              type="file"
              id="photoId"
              name="file"
              className="w-full px-3 py-2 border rounded-sm"
              onChange={(e) => {
                console.log(e.target?.files);
                setUser((u) => {
                  return { ...u, file: e.target.files[0] as any };
                });
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-bold mb-2"
            >
              Role
            </label>

            <select
              color="blue"
              id="role"
              name="role"
              multiple
              className="w-full px-3 py-2 border rounded-sm"
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setUser((u) => {
                  return { ...u, roleId: selectedOptions };
                });
              }}
            >
              {roles?.map((m, i) => {
                return <option value={m?.id}>{m?.name}</option>;
              })}
              {/* Add more role options as needed */}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default create;
