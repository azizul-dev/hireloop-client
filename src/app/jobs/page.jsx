import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/api/jobs";


export default async function Page() {
  const jobPayload = {
    _id: { $oid: "6a257edd041f412b6e81068a" },
    title: "Frontend Developer",
    deadline: "2026-06-10",
    salaryMin: "25",
    salaryMax: "40",
    category: "Marketing",
    type: "Part-time",
    currency: "EUR",
    isRemote: true,
    companyName: "Software Corp",
    companyLogo: "https://i.ibb.co/7dmQww8N/logo2.avif"
    
  };

  const jobs = await getJobs();

  return (
    <div className="p-8 bg-black min-h-screen flex items-center justify-center">
      <JobCard job={jobs[0]} />
    </div>
  );
}