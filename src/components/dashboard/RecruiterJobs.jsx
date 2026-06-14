"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const EditIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const statusConfig = {
  active: {
    label: "Active",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border border-emerald-400/20",
  },
  closed: {
    label: "Closed",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/20",
  },
  draft: {
    label: "Draft",
    dot: "bg-yellow-400",
    text: "text-yellow-400",
    bg: "bg-yellow-400/10 border border-yellow-400/20",
  },
};

const formatDeadline = (dateStr) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const FILTERS = ["All", "active", "closed", "draft"];

export default function RecruiterJobs({ companyId: companyIdProp }) {
  const [jobs, setJobs] = useState([]);
  const [companyId, setCompanyId] = useState(companyIdProp || null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (companyIdProp) {
      setCompanyId(companyIdProp);
      return;
    }
    if (!session?.user?.id) return;
    const fetchCompany = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/my/companies?recruiterId=${session.user.id}`,
        );
        const company = await res.json();
        console.log("company:", company);
        // API may return an array or a single object
        const id = Array.isArray(company)
          ? company?.[0]?._id
          : company?._id;
        setCompanyId(id || null);
      } catch (err) {
        console.error("Failed to fetch company details:", err);
      }
    };
    fetchCompany();
  }, [session?.user?.id, companyIdProp]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const statusParam = filter !== "All" ? `&status=${filter}` : "";
        // Prefer recruiterId-based fetch (works even without a company doc)
        const url = `${baseUrl}/api/jobs?recruiterId=${session.user.id}${statusParam}`;
        const res = await fetch(url);
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchJobs();
    } else if (session !== undefined) {
      // session loaded but no user
      setLoading(false);
    }
  }, [session?.user?.id, filter]);

  const filtered = jobs.filter(
    (j) =>
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#f0f0f0]">Company Jobs</h1>
          <p className="text-sm text-[#666] mt-1">Manage your job postings</p>
        </div>
        <Link href="/dashboard/recruiter/jobs/new" className="w-full sm:w-auto">
          <button className="flex items-center gap-2 justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-full">
            <PlusIcon /> Post New Job
          </button>
        </Link>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors capitalize
                ${
                  filter === f
                    ? "bg-blue-500/10 border-blue-500/40 text-blue-400"
                    : "bg-[#1a1a1a] border-[#2a2a2a] text-[#777] hover:text-[#aaa]"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs..."
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-[#aaa] outline-none w-full md:w-64 placeholder:text-[#444] focus:border-[#3a3a3a]"
        />
      </div>

      <p className="text-xs text-[#555] mb-3">
        Showing {filtered.length} job{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Table */}
      <Card
        className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px] overflow-hidden"
        shadow="none"
      >
        <div className="overflow-x-auto w-full">
          <div className="min-w-[850px]">
            {/* Head */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] px-5 py-3 border-b border-[#252525] bg-[#161616]">
              {[
                "Job Title",
                "Category",
                "Salary",
                "Deadline",
                "Status",
                "Actions",
              ].map((h) => (
                <span
                  key={h}
                  className="text-[11px] font-medium text-[#555] uppercase tracking-wider"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {loading ? (
              <div className="py-12 text-center text-sm text-[#444]">
                Loading jobs...
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-sm text-[#444]">
                No jobs found.
              </div>
            ) : (
              filtered.map((job) => {
                const s = statusConfig[job.status] ?? statusConfig.active;
                return (
                  <div
                    key={job._id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] px-5 py-4 border-b border-[#1f1f1f] last:border-b-0 items-center hover:bg-[#1f1f1f] transition-colors"
                  >
                    {/* Title */}
                    <div>
                      <p className="text-sm font-medium text-[#e8e8e8]">
                        {job.title}
                      </p>
                      <div className="flex gap-2 mt-0.5 text-xs text-[#555]">
                        <span>📍 {job.location}</span>
                        <span>· {job.type}</span>
                        <span>· {job.isRemote ? "Remote" : "On-site"}</span>
                      </div>
                    </div>
                    {/* Category */}
                    <span className="text-sm text-[#aaa]">{job.category}</span>
                    {/* Salary */}
                    <span className="text-sm text-blue-400 font-medium">
                      {job.currency === "USD" ? "$" : job.currency}
                      {job.salaryMin}–{job.salaryMax}
                    </span>
                    {/* Deadline */}
                    <span className="text-sm text-[#aaa]">
                      {formatDeadline(job.deadline)}
                    </span>
                    {/* Status */}
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="p-1.5 bg-[#252525] hover:bg-[#2f2f2f] border border-[#333] text-[#aaa] hover:text-[#e8e8e8] rounded-md transition-colors">
                        <EditIcon />
                      </button>
                      <button className="p-1.5 bg-[#252525] hover:bg-red-500/10 border border-[#333] hover:border-red-500/30 text-[#aaa] hover:text-red-400 rounded-md transition-colors">
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
