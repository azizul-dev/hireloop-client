import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";
import { Button } from "@heroui/react";
import { getPlanById } from "@/lib/api/plans";


const JobApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#121214] border border-neutral-800 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-rose-400 text-xl">✕</span>
          </div>
          <h1 className="text-xl font-bold text-white">Access Denied</h1>
          <p className="text-sm text-neutral-400">
            Only job seekers can apply for positions. Recruiters cannot submit applications.
          </p>
          <Button
            as={Link}
            href="/"
            className="bg-white text-black font-semibold rounded-xl px-6 py-2.5 text-sm hover:bg-neutral-200 transition-colors"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);

  const plan = await getPlanById(user?.plan || 'seeker_free')
  const job = await getJobById(id);
  const remaining = plan.maxApplicationsPerMonth - applications.length;
  const limitReached = applications.length >= plan.maxApplicationsPerMonth;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* Usage Banner */}
        <div className={`border rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          limitReached
            ? "bg-rose-500/5 border-rose-500/20"
            : "bg-amber-500/5 border-amber-500/20"
        }`}>
          <div>
            <p className={`text-sm font-semibold ${limitReached ? "text-rose-400" : "text-amber-400"}`}>
              {limitReached
                ? "Monthly limit reached"
                : `${remaining} application${remaining !== 1 ? "s" : ""} remaining this month`}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              {applications.length} of {plan.maxApplicationsPerMonth} used · {plan.name} Plan
            </p>
          </div>
          {limitReached && (
            <Link
              href="/pricing"
              className="text-xs px-4 py-2 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors whitespace-nowrap"
            >
              Upgrade Plan
            </Link>
          )}
        </div>

        {/* Limit Reached State */}
        {limitReached ? (
          <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-amber-400 text-xl">⚠</span>
            </div>
            <h2 className="text-lg font-bold text-white">Application Limit Reached</h2>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto">
              You have used all {plan.maxApplicationsPerMonth} applications for this month on the {plan.name} plan. Upgrade to apply for more positions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/pricing"
                className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors text-sm"
              >
                View Plans
              </Link>
              <Link
                href="/jobs"
                className="px-6 py-2.5 bg-transparent border border-neutral-800 text-neutral-400 font-medium rounded-xl hover:bg-neutral-900 transition-colors text-sm"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        ) : (
          <JobApply applicant={user} job={job} />
        )}

      </div>
    </div>
  );
};

export default JobApplyPage;