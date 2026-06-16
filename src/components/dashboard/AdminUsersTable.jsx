// src/components/dashboard/AdminUsersTable.jsx
"use client";
import { ArrowRotateLeft, Eye, TrashBin } from "@gravity-ui/icons";

const initials = (name) =>
  name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";

const roleBadge = {
  admin: "bg-purple-100 text-purple-800",
  recruiter: "bg-blue-100 text-blue-800",
  seeker: "bg-green-100 text-green-800",
};
const statusBadge = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-600",
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function AdminUsersTable({ users = [] }) {

  const handleRoleChange = (user, newRole) => {
    console.log("role change", user._id, newRole);
  };

  const handleStatusChange = (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    console.log("status change", user._id, newStatus);
  };

  const handleDelete = (user) => {
    console.log("delete", user._id);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">

      {/* Desktop table — md এর উপরে দেখাবে */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>
              {["User", "Role", "Plan", "Joined", "Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id?.toString() || user.email || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {initials(user.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={user.role}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer outline-none ${roleBadge[user.role] || roleBadge.seeker}`}
                    >
                      <option value="admin">admin</option>
                      <option value="recruiter">recruiter</option>
                      <option value="seeker">seeker</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{user.plan}</td>
                  <td className="px-4 py-3 text-gray-500">{fmtDate(user.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleStatusChange(user)}
                      className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${statusBadge[user.status] || statusBadge.inactive}`}
                    >
                      {user.status || "active"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatusChange(user)}
                        title="Toggle status"
                        className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-500"
                      >
                        <ArrowRotateLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => console.log("view", user._id)}
                        title="View details"
                        className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-500"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        title="Delete user"
                        className="p-1.5 rounded border border-red-200 hover:bg-red-50 text-red-500"
                      >
                        <TrashBin className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card list — md এর নিচে দেখাবে */}
      <div className="md:hidden divide-y divide-gray-100">
        {users.length === 0 ? (
          <p className="py-8 text-center text-gray-400 text-sm">No users found</p>
        ) : (
          users.map((user, index) => (
            <div
              key={user._id?.toString() || user.email || index}
              className="p-4 flex flex-col gap-3"
            >
              {/* Top row — avatar + name + actions */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {initials(user.name)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleStatusChange(user)}
                    title="Toggle status"
                    className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-500"
                  >
                    <ArrowRotateLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => console.log("view", user._id)}
                    title="View"
                    className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-500"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    title="Delete"
                    className="p-1.5 rounded border border-red-200 hover:bg-red-50 text-red-500"
                  >
                    <TrashBin className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom row — badges + role select + date */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  defaultValue={user.role}
                  onChange={(e) => handleRoleChange(user, e.target.value)}
                  className={`px-2 py-1 rounded-full font-medium border-0 cursor-pointer outline-none ${roleBadge[user.role] || roleBadge.seeker}`}
                >
                  <option value="admin">admin</option>
                  <option value="recruiter">recruiter</option>
                  <option value="seeker">seeker</option>
                </select>

                <button
                  onClick={() => handleStatusChange(user)}
                  className={`px-2 py-1 rounded-full font-medium cursor-pointer ${statusBadge[user.status] || statusBadge.inactive}`}
                >
                  {user.status || "active"}
                </button>

                <span className="text-gray-400">{user.plan}</span>
                <span className="text-gray-400 ml-auto">{fmtDate(user.createdAt)}</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}