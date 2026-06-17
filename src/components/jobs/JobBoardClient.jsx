"use client";

import { useState, useMemo, useEffect } from "react";
import {
  TextField,
  InputGroup,
  Label,
  Select,
  ListBox,
  Button,
  Pagination,
} from "@heroui/react";
import {
  Magnifier,
  Briefcase,
  Globe,
  ArrowRotateLeft,
} from "@gravity-ui/icons";
import JobCard from "./JobCard";
import { useRouter } from "next/navigation";

export default function JobBoardClient({ Jobs, filters }) {
  // 1. Pristine Filter States managed via strings
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [selectedType, setSelectedType] = useState(filters.jobType || "all");
  const [workplace, setWorkplace] = useState(
    filters.isRemote === true
      ? "true"
      : filters.isRemote === false
        ? "false"
        : "all",
  );

  const router = useRouter();

  const [page, setPage] = useState(1);
  const totalItems =  Jobs.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems/itemsPerPage);

  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) {
      sp.set("search", searchQuery);
    }
    if (selectedType !== "all") {
      sp.set("jobType", selectedType);
    }
    if (workplace !== "all") {
      sp.set("isRemote", workplace);
    }
    console.log("search", sp.toString());

    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, searchQuery, selectedType, workplace]);

  // Hardcoded options matching your UI design labels
  const filterTypeOptions = ["all", "Full-time", "Part-time", "Internship"];

  // 2. Strict Filter Engine
  // const jobs = useMemo(() => {
  //   const cleanSearch = searchQuery.trim().toLowerCase();

  //   return Jobs.filter((job) => {
  //     // Search Bar match (Checks safely against null fields)
  //     const matchesSearch =
  //       !cleanSearch ||
  //       job.title?.toLowerCase().includes(cleanSearch) ||
  //       job.companyName?.toLowerCase().includes(cleanSearch) ||
  //       job.category?.toLowerCase().includes(cleanSearch);

  //     // Job Type match
  //     const matchesType =
  //       jobType === "all" ||
  //       job.type?.toLowerCase() === jobType.toLowerCase();

  //     // Workplace match (job.isRemote field logic verification)
  //     let matchesWorkplace = true;
  //     if (workplace === "remote") {
  //       matchesWorkplace = job.isRemote === true;
  //     } else if (workplace === "on-site") {
  //       matchesWorkplace = job.isRemote === false;
  //     }

  //     return matchesSearch && matchesType && matchesWorkplace;
  //   });
  // }, [searchQuery, jobType, workplace, Jobs]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedType("all");
    setWorkplace("all");
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-2">
      {/* FILTER CONTROLS BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-end justify-between bg-[#121214] border border-neutral-800 p-6 rounded-2xl mb-8">
        {/* Search Input Field (Fixed with value & onChange bound to Native Input element) */}
        <div className="w-full md:max-w-xs">
          <TextField>
            <Label className="text-xs font-semibold text-neutral-400 mb-1.5 block">
              Search Jobs
            </Label>
            <InputGroup className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden focus-within:border-neutral-600 transition-colors">
              <InputGroup.Prefix className="pl-3 flex items-center text-neutral-500">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Title, company, skill..."
                className="bg-transparent text-white placeholder-neutral-500 text-sm py-2 px-3 w-full focus:outline-none"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* Job Type Dropdown */}
        <div className="w-full md:max-w-[200px]">
          <Select
            selectedKey={selectedType}
            onSelectionChange={(key) => setSelectedType(String(key))}
          >
            <Label className="text-xs font-semibold text-neutral-400 mb-1.5 block">
              Job Type
            </Label>
            <Select.Trigger className="w-full flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-neutral-200 focus:outline-none">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-neutral-500" />
                <Select.Value />
              </div>
              <Select.Indicator className="text-neutral-500 text-xs">
                ▼
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-[#121214] border border-neutral-800 rounded-xl shadow-xl mt-1 overflow-hidden z-50 min-w-[200px]">
              <ListBox aria-label="Job Type filter selection">
                {filterTypeOptions.map((type) => (
                  <ListBox.Item
                    key={type}
                    id={type}
                    textValue={type}
                    className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white cursor-pointer transition-colors capitalize"
                  >
                    <Label>{type === "all" ? "All Types" : type}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Workplace Setup Dropdown */}
        <div className="w-full md:max-w-[200px]">
          <Select
            selectedKey={workplace}
            onSelectionChange={(key) => setWorkplace(String(key))}
          >
            <Label className="text-xs font-semibold text-neutral-400 mb-1.5 block">
              Workplace
            </Label>
            <Select.Trigger className="w-full flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-neutral-200 focus:outline-none">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-neutral-500" />
                <Select.Value />
              </div>
              <Select.Indicator className="text-neutral-500 text-xs">
                ▼
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-[#121214] border border-neutral-800 rounded-xl shadow-xl mt-1 overflow-hidden z-50 min-w-[200px]">
              <ListBox aria-label="Workplace layout filter selection">
                <ListBox.Item
                  key="all"
                  id="all"
                  textValue="all"
                  className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white cursor-pointer transition-colors"
                >
                  <Label>All Workplace Arrangements</Label>
                </ListBox.Item>
                <ListBox.Item key="true" id="true">
                  <Label>Remote</Label>
                </ListBox.Item>

                <ListBox.Item key="false" id="false">
                  <Label>On-site / Hybrid</Label>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Reset Actions Button */}
        <Button
          onClick={handleReset}
          variant="light"
          startContent={<ArrowRotateLeft className="w-4 h-4" />}
          className="text-neutral-400 hover:text-white text-sm min-h-[40px] px-4 font-medium transition-colors cursor-pointer"
        >
          Reset
        </Button>
      </div>

      {/* JOBS GRID DISPLAY */}
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Jobs.map((job) => (
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>
        <Pagination className="w-full">
          <Pagination.Summary>
            Showing {startItem}-{endItem} of {totalItems} results
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => p - 1)}
              >
                <Pagination.PreviousIcon />
                <span>Previous</span>
              </Pagination.Previous>
            </Pagination.Item>
            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => p + 1)}
              >
                <span>Next</span>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </>

      {/* Empty State Fallback Layout */}
      {Jobs.length === 0 && (
        <div className="text-center py-16 border border-dashed border-neutral-800 rounded-2xl">
          <p className="text-neutral-500 text-sm">
            No positions match your selected criteria.
          </p>
        </div>
      )}
    </div>
  );
}
