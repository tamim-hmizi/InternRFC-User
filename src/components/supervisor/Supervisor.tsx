"use client";
import { ROLE, User } from "@/lib/User";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Supervisor() {
  const [users, setUsers] = useState([] as User[]);
  const [model, setModel] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "3",
    image: null as File | null,
  });

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data.filter((user: User) => user.role === ROLE.SUPERVISER));
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (email: string) => {
    try {
      await axios.delete(`/api/users/${email}`);
      await fetchUsers();
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("address", formData.address);
    data.append("role", formData.role);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (isUpdating && selectedUser) {
        await axios.put(`/api/users/${selectedUser.email}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSelectedUser(null);
      } else {
        await axios.post("/api/users", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setModel(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "3",
        image: null,
      });
      setIsUpdating(false);
      fetchUsers();
    } catch (error) {
      throw new Error(
        isUpdating ? "Failed to update user" : "Failed to create user"
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name as string,
      email: user.email as string,
      password: user.password as string, // Do not pre-fill password for security reasons
      address: user.address as string,
      role: user.role.toString(),
      image: null,
    });
    setSelectedUser(user);
    setIsUpdating(true);
    setModel(true);
  };

  return (
    <div className="">
      <button
        className="btn btn-secondary float-right"
        onClick={() => {
          setIsUpdating(false);
          setModel(true);
        }}
      >
        Ajouter
      </button>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Nom</th>
              <th>Image</th>
              <th>Email</th>
              <th>Adresse</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td className="font-bold">{user.name}</td>
                <td>
                  {user.image && user.image !== "" && user.image !== null ? (
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={user.image as string}
                          alt="User Avatar"
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src="/images/avatar.png"
                          alt="Default Avatar"
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                  )}
                </td>
                <td>
                  <div className="text-sm opacity-50">{user.email}</div>
                </td>
                <td>{user.address}</td>
                
                <th>
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn btn-ghost btn-xs"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user.email as string)}
                    className="btn btn-ghost btn-xs"
                  >
                    Supprimer
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {model && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <div className="card-actions justify-end">
                <button
                  className="btn btn-square btn-sm"
                  onClick={() => setModel(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateOrUpdate}>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Nom"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    className="grow"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isUpdating}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!isUpdating}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Adresse"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </label>
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary mt-4">
                    {isUpdating ? "Mettre à jour" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
