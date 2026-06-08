import { Card, Button, Chip } from "@heroui/react";
import Image from "next/image";
import { ArrowRight, Briefcase, CircleDollar, Globe } from "@gravity-ui/icons";

export default function JobCard({ job }) {
  const {
    _id,
    title = "Untitled Position",
    companyName = "Unknown Company",
    companyLogo,
    category,
    type,
    salaryMin,
    salaryMax,
    currency = "USD",
    isRemote,
    deadline,
  } = job || {};

  return (
    <Card className="w-full max-w-[400px] bg-[#121214] text-white p-4 sm:p-5 border border-neutral-800 rounded-3xl">
      <div className="flex gap-3 sm:gap-4 items-start pb-2 px-0">
        {companyLogo && (
          <Image
            alt={`${companyName} logo`}
            height={48}
            width={48}
            src={companyLogo}
            className="object-cover bg-neutral-800 p-1 rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100 truncate">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-medium truncate">
            {companyName}
          </p>
        </div>
      </div>

      <div className="py-3 sm:py-4 px-0 flex flex-col gap-3 sm:gap-4">
        {category && (
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Explore this opportunity in our {category} team. Looking for a
            proactive individual for this {type?.toLowerCase() || "regular"} role.
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <Chip
            variant="flat"
            size="sm"
            className="bg-neutral-800 text-neutral-300 border-none px-2 sm:px-3 text-xs"
          >
            <Globe className="w-3 h-3 inline mr-1" />
            {isRemote ? "Remote" : "Hybrid"}
          </Chip>

          {type && (
            <Chip
              variant="flat"
              size="sm"
              className="bg-neutral-800 text-neutral-300 border-none px-2 sm:px-3 text-xs"
            >
              <Briefcase className="w-3 h-3 inline mr-1" />
              {type}
            </Chip>
          )}

          {salaryMin && salaryMax && (
            <Chip
              variant="flat"
              size="sm"
              className="bg-neutral-800 text-neutral-300 border-none px-2 sm:px-3 text-xs"
            >
              <CircleDollar className="w-3 h-3 inline mr-1" />
              {salaryMin}–{salaryMax}/hr ({currency})
            </Chip>
          )}
        </div>
      </div>

      <div className="pt-3 sm:pt-4 pb-0 px-0 flex justify-between items-center">
        <Button
          as="a"
          href={`/jobs/${_id?.$oid}`}
          variant="light"
          size="sm"
          endContent={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          className="text-neutral-200 hover:text-white font-medium p-0 bg-transparent min-w-0 text-xs sm:text-sm"
        >
          Apply Now
        </Button>

        {deadline && (
          <span className="text-xs text-neutral-500">
            Ends: {new Date(deadline).toLocaleDateString()}
          </span>
        )}
      </div>
    </Card>
  );
}