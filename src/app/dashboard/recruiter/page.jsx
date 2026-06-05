'use client';
import StatsCard from "@/components/dashboard/StatsCard";
import { useSession } from "@/lib/auth-client";

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  const user = session?.user;

  const stats = [
    { label: "Total Job Posts",  value: "48",    icon: "file" },
    { label: "Total Applicants", value: "1,284", icon: "persons" },
    { label: "Active Jobs",      value: "18",    icon: "lightning" },
    { label: "Jobs Closed",      value: "32",    icon: "check" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user?.name || "Recruiter"}!</h1>
      <p className="mt-2 text-gray-600">This is your recruiter dashboard.</p>
      <StatsCard Stats={stats} />
    </div>
  );
};

export default RecruiterPage;