"use client";

import { updateCompany } from "@/lib/actions/companies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const chipStyle = {
  Approved: { background: "#EAF3DE", color: "#27500A" },
  Rejected: { background: "#FCEBEB", color: "#791F1F" },
  Pending: { background: "#FAEEDA", color: "#633806" },
};

const StatusBadge = ({ status }) => {
  const s = status || "Pending";
  const style = chipStyle[s] || chipStyle.Pending;
  const dot = { Approved: "#639922", Rejected: "#E24B4A", Pending: "#BA7517" };
  return (
    <span
      style={{
        ...style,
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dot[s] || dot.Pending,
          display: "inline-block",
        }}
      />
      {s}
    </span>
  );
};

export default function CompaniesTable({ companies: initial }) {
  const router = useRouter();
  const [companies, setCompanies] = useState(initial);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setCompanies(initial);
  }, [initial]);

  const handleApprove = async (id) => {
    setLoading(id + "Approved");
    try {
      const result = await updateCompany(id, { status: "Approved" });
      if (result.acknowledged || result.modifiedCount) {
        toast.success("Company approved successfully");
        setCompanies((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: "Approved" } : c))
        );
        router.refresh();
      } else {
        toast.error("Failed to approve company");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (id) => {
    setLoading(id + "Rejected");
    try {
      const result = await updateCompany(id, { status: "Rejected" });
      if (result.acknowledged || result.modifiedCount) {
        toast.error("Company rejected");
        setCompanies((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: "Rejected" } : c))
        );
        router.refresh();
      } else {
        toast.error("Failed to reject company");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const ActionButtons = ({ id, status }) => (
    <div className="flex gap-2">
      <button
        disabled={status === "Approved" || !!loading}
        onClick={() => handleApprove(id)}
        className="px-3 py-1.5 text-xs rounded-lg font-semibold transition-all disabled:opacity-40 hover:scale-105 active:scale-95 cursor-pointer"
        style={{ background: "#EAF3DE", color: "#27500A" }}
      >
        {loading === id + "Approved" ? "..." : "✓ Approve"}
      </button>
      <button
        disabled={status === "Rejected" || !!loading}
        onClick={() => handleReject(id)}
        className="px-3 py-1.5 text-xs rounded-lg font-semibold transition-all disabled:opacity-40 hover:scale-105 active:scale-95 cursor-pointer"
        style={{ background: "#FCEBEB", color: "#791F1F" }}
      >
        {loading === id + "Rejected" ? "..." : "✕ Reject"}
      </button>
    </div>
  );

  const pending = companies.filter((c) => c.status === "Pending").length;
  const approved = companies.filter((c) => c.status === "Approved").length;
  const rejected = companies.filter((c) => c.status === "Rejected").length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending", value: pending, bg: "#FAEEDA", color: "#633806" },
          {
            label: "Approved",
            value: approved,
            bg: "#EAF3DE",
            color: "#27500A",
          },
          {
            label: "Rejected",
            value: rejected,
            bg: "#FCEBEB",
            color: "#791F1F",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 flex flex-col gap-1"
            style={{ background: s.bg }}
          >
            <span
              className="text-xs font-medium opacity-70"
              style={{ color: s.color }}
            >
              {s.label}
            </span>
            <span className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
      {/* Mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {companies.map((c) => (
          <div
            key={c._id}
            className="rounded-2xl border border-default-100  dark:bg-default-50 p-4 flex flex-col gap-3 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <Image
                  src={c.logo || "/placeholder.png"}
                  alt={c.name}
                  width={44}
                  height={44}
                  className="object-cover rounded-xl border border-default-100 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{c.name}</p>
                  <p className="text-xs text-default-400 truncate">
                    {c.industry || "—"}
                  </p>
                </div>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-default-50 dark:bg-default-100 p-3">
              <div>
                <p className="text-[11px] text-default-400 mb-0.5">Location</p>
                <p className="text-xs font-medium text-default-700">
                  {c.location || "—"}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-default-400 mb-0.5">Size</p>
                <p className="text-xs font-medium text-default-700">
                  {c.employeeCount || "—"}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-default-400 mb-0.5">Jobs</p>
                <p className="text-xs font-medium text-default-700">
                  {c.jobCount ?? 0}
                </p>
              </div>
              {c.websiteUrl && (
                <div className="col-span-2">
                  <p className="text-[11px] text-default-400 mb-0.5">Website</p>
                  <p className="text-xs font-medium text-blue-500 truncate">
                    {c.websiteUrl}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-1 border-t border-default-100">
              <ActionButtons id={c._id} status={c.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block rounded-2xl border border-default-100 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-default-100">
          <h2 className="text-base font-semibold">Company approvals</h2>
          <p className="text-xs text-default-400 mt-0.5">
            {companies.length} total companies
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b ">
                <th className="text-left p-4">Company</th>
                <th className="text-left p-4">Industry</th>
                <th className="text-left p-4">Location</th>
                <th className="text-left p-4">Size</th>
                <th className="text-left p-4">Jobs</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((c) => (
                <tr key={c._id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={c.logo || "/placeholder.png"}
                        alt={c.name}
                        width={36}
                        height={36}
                        className="rounded-lg border"
                      />

                      <div>
                        <p className="font-semibold text-sm">{c.name}</p>

                        {c.websiteUrl && (
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">
                            {c.websiteUrl}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">{c.industry || "—"}</td>

                  <td className="p-4">{c.location || "—"}</td>

                  <td className="p-4">{c.employeeCount || "—"}</td>

                  <td className="p-4 font-medium">{c.jobCount ?? 0}</td>

                  <td className="p-4">
                    <StatusBadge status={c.status} />
                  </td>

                  <td className="p-4">
                    <ActionButtons id={c._id} status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
