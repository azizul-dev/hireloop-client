import { getJobById } from '@/lib/api/jobs';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const ApplyJobsPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job || job.error) return notFound();

    const {
        title,
        deadline,
        salaryMin,
        salaryMax,
        responsibilities,
        requirements,
        benefits,
        category,
        type,
        currency,
        isRemote,
        companyName,
        companyLogo,
        status,
        createdAt,
    } = job;

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header Card */}
                <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4">
                        {companyLogo && (
                            <Image
                                src={companyLogo}
                                alt={companyName}
                                width={56}
                                height={56}
                                className="rounded-xl object-cover bg-neutral-800 p-1"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
                            <p className="text-neutral-400 text-sm mt-1">{companyName}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {type}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {isRemote ? "Remote" : "On-site"}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                            {category}
                        </span>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "Salary Min", value: `${salaryMin} ${currency}` },
                        { label: "Salary Max", value: `${salaryMax} ${currency}` },
                        { label: "Deadline", value: new Date(deadline).toLocaleDateString("en-GB") },
                        { label: "Status", value: status?.charAt(0).toUpperCase() + status?.slice(1) },
                    ].map((item) => (
                        <div key={item.label} className="bg-[#121214] border border-neutral-800 rounded-xl p-4">
                            <p className="text-xs text-neutral-500 mb-1">{item.label}</p>
                            <p className="text-sm font-semibold text-white">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Details Sections */}
                {[
                    { title: "Responsibilities", content: responsibilities },
                    { title: "Requirements", content: requirements },
                    { title: "Benefits", content: benefits },
                ].map((section) => (
                    <div key={section.title} className="bg-[#121214] border border-neutral-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-3 text-white">{section.title}</h2>
                        <p className="text-neutral-400 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
                    </div>
                ))}

                {/* Apply Button */}
                <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-neutral-400">Ready to join {companyName}?</p>
                        <p className="text-xs text-neutral-600 mt-1">
                            Posted on {new Date(createdAt?.$date || createdAt).toLocaleDateString("en-GB")}
                        </p>
                    </div>
                    <button className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors text-sm">
                        Apply Now
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ApplyJobsPage;