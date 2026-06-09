import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  console.log("Current user Session:", user);
  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>
          You do not have permission to access this page. Only job seekers can
          apply for jobs.
        </p>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);

  const plan = {
    name: "Free",
    maxApplicationsPerMonth: 3,
  };

  const job = await getJobById(id);
  return (
    <div>
      <h2>
        you have applied so far: {applications.length} out of{" "}
        {plan.maxApplicationsPerMonth} This month
      </h2>
      <p>Purchase plan to apply for more positions. <Link href={'/'}>as;kl</Link></p>
      {applications.length < plan.maxApplicationsPerMonth && (
        <JobApply applicant={user} job={job} />
      )}
    </div>
  );
};

export default JobApplyPage;
