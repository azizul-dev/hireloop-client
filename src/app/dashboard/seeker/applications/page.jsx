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

      <div className="rounded-xl border border-white/[0.08] overflow-hidden">
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