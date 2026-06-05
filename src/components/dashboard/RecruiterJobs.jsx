"use client";
import RecruiterJobs from "@/components/dashboard/RecruiterJobs";
import { useSession } from "@/lib/auth-client";

const RecruiterJobsPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  const companyId = session?.user?.companyId;

  return <RecruiterJobs companyId={companyId} />;
};

export default RecruiterJobsPage;
