"use client";
import { ROLE, User } from "@/lib/User";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Intern() {
  const [users, setUsers] = useState([] as User[]);
  const [model, setModel] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [supervisors, setSupervisors] = useState([] as User[]);
  const [formData, setFormData] = useState({
    role: "1",
    supervisor: "",
    email: "",
  });

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data.filter((user: User) => user.role === ROLE.INTERN));
      setSupervisors(
        data.filter((user: User) => user.role === ROLE.SUPERVISER)
      );
    } catch (error) {
      console.error("Failed to fetch users", error);
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
      console.error("Failed to delete user", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("supervisor", formData.supervisor);
    data.append("role", formData.role);
    data.append("email", formData.email);

    try {
      if (isUpdating && selectedUser) {
        await axios.put(`/api/users`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSelectedUser(null);
      }
      setModel(false);
      setFormData({
        supervisor: "",
        role: "1",
        email: "",
      });
      setIsUpdating(false);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (user: User) => {
    setFormData({
      role: user.role.toString(),
      supervisor: user.supervisor as string,
      email: user.email as string,
    });
    setSelectedUser(user);
    setIsUpdating(true);
    setModel(true);
  };

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Image</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>CV</th>
              <th>Date debut stage</th>
              <th>Duree stage</th>
              <th>Type stage</th>
              <th>Encadreur</th>
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
                  {user.CV ? (
                    <Link href={user.CV as string}>
                      <button className="btn">detail</button>
                    </Link>
                  ) : (
                    <p>Pas de CV.</p>
                  )}
                </th>
                <td>
                  {user.internshipStartDate
                    ? new Date(user.internshipStartDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <th>{user.internshipDuration}</th>
                <th>{user.internshipType}</th>
                <th>{user.supervisor}</th>
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
              <form onSubmit={handleUpdate}>
                <label className="flex items-center gap-2 w-full">
                  <select
                    className="select w-full max-w-xs"
                    name="supervisor"
                    required
                    value={formData.supervisor || ""}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      Supervisor
                    </option>
                    {supervisors.map((supervisor) => (
                      <option
                        key={supervisor.email}
                        value={supervisor.email as string}
                      >
                        {supervisor.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Mettre à jour
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
