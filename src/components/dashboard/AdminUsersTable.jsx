// src/components/dashboard/AdminUsersTable.jsx
"use client";
import { Magnifier, ArrowRotateLeft, Eye, TrashBin } from "@gravity-ui/icons";

const initials = (name) =>
  name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

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
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500">
          <tr>
            {["User", "Role", "Plan", "Joined", "Status", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">
                {h}
              </th>
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
                className="hover:bg-gray-300 transition-colors"
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
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadge[user.role] || roleBadge.seeker}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{user.plan}</td>
                <td className="px-4 py-3 text-gray-500">
                  {fmtDate(user.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge[user.status] || statusBadge.inactive}`}
                  >
                    {user.status || "active"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-500">
                      <ArrowRotateLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-500">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded border border-red-200 hover:bg-red-50 text-red-500">
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
  );
}
