
import JobBoardClient from "@/components/jobs/JobBoardClient";
import { getJobs } from "@/lib/api/jobs";

export default async function Page() {
  // Fetch from the database on the server side
  const jobs = await getJobs();
  console.log("JOBS DATA:", JSON.stringify(jobs?.slice(0, 2), null, 2));

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto mb-6 px-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Explore Careers
        </h1>
        <p className="text-neutral-400 text-sm mt-1">
          Find your next opening from your favorite engineering teams.
        </p>
      </div>

      {/* Render the core filtering component */}
      <JobBoardClient Jobs={jobs || []} />
    </div>
  );
}