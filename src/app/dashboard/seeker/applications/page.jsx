import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import { Chip, Button } from "@heroui/react";

const statusMap = {
  pending:   { label: "Pending",      color: "warning" },
  review:    { label: "Under review", color: "primary" },
  interview: { label: "Interview",    color: "secondary" },
  rejected:  { label: "Rejected",     color: "danger" },
  hired:     { label: "Hired",        color: "success" },
};

const Page = async () => {
  let jobs = [];

  try {
    const user = await getUserSession();
    if (user?.id) {
      jobs = await getApplicationsByApplicant(user.id);
    }
  } catch (error) {
    console.error("Applications fetch error:", error);
  }

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-lg font-medium text-white">My applications</h1>
        <p className="text-sm text-foreground-400">{jobs.length} total applications</p>
      </div>

      {/* Mobile Card List View */}
      <div className="flex flex-col gap-3 md:hidden">
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-foreground-400 border border-white/[0.08] rounded-2xl bg-[#121214]">
            No applications found.
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-white/[0.08] bg-[#121214] p-4 flex flex-col gap-3 shadow-sm hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white text-sm">{job.jobTitle}</h3>
                  <p className="text-xs text-foreground-400 mt-0.5">{job.location}</p>
                </div>
                <Chip
                  size="sm"
                  variant="flat"
                  color={statusMap[job.status]?.color ?? "default"}
                >
                  {statusMap[job.status]?.label ?? job.status}
                </Chip>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/[0.03] p-3 text-xs">
                <div>
                  <p className="text-[11px] text-foreground-400 mb-0.5">Company</p>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="h-5 w-5 rounded bg-violet-700/20 flex items-center justify-center text-violet-400 text-[10px] font-medium shrink-0">
                      {job.companyName?.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-white truncate">{job.companyName}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-foreground-400 mb-0.5">Job Type</p>
                  <p className="font-medium text-white">{job.jobType ?? "—"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] text-foreground-400 mb-0.5">Applied on</p>
                  <p className="font-medium text-white">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <Button
                  size="sm"
                  variant="flat"
                  as="a"
                  href={`/dashboard/seeker/applications/${job.id}`}
                  className="w-full text-center"
                >
                  Details
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border border-white/[0.08] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.04]">
              <th className="text-left px-4 py-3 text-xs font-medium text-foreground-400">Job title</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-foreground-400">Company</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-foreground-400">Applied on</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-foreground-400">Job type</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-foreground-400">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-foreground-400">
                  No applications found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-white/[0.08] last:border-0 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{job.jobTitle}</p>
                    <p className="text-xs text-foreground-400 mt-0.5">{job.location}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md bg-violet-700/20 flex items-center justify-center text-violet-400 text-xs font-medium shrink-0">
                        {job.companyName?.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-white">{job.companyName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground-400">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-foreground-400">{job.jobType ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={statusMap[job.status]?.color ?? "default"}
                    >
                      {statusMap[job.status]?.label ?? job.status}
                    </Chip>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="flat"
                      as="a"
                      href={`/dashboard/seeker/applications/${job.id}`}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;