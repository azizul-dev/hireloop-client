"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import {
  Globe,
  MapPin,
  ArrowUpFromLine,
  Pencil,
  Factory,
  ShieldCheck,
  ShieldExclamation,
} from "@gravity-ui/icons";

export default function RecruiterCompanyPage() {
  const [viewState, setViewState] = useState("empty");
  const [isLoading, setIsLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  const [industry, setIndustry] = useState("Technology");
  const [employeeCount, setEmployeeCount] = useState("1-10 employees");
  const [logoUrl, setLogoUrl] = useState("");

  const [companyData, setCompanyData] = useState({
    name: "",
    industry: "",
    websiteUrl: "",
    location: "",
    employeeCount: "",
    logo: "",
    description: "",
    status: "Pending",
  });

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY";
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();

      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        alert("Upload failed. Check API configuration keys.");
      }
    } catch (err) {
      console.error("ImgBB upload error:", err);
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const updatedPayload = {
      name: formData.get("companyName"),
      websiteUrl: formData.get("websiteUrl"),
      location: formData.get("location"),
      description: formData.get("description"),
      industry: industry,
      employeeCount: employeeCount,
      logo:
        logoUrl || companyData.logo || "https://placehold.co/100x100?text=Logo",
      status: companyData.status || "Pending",
    };

    setTimeout(() => {
      setCompanyData(updatedPayload);
      setIsLoading(false);
      setViewState("view");
    }, 800);
  };

  const renderStatusBadge = (status) => {
    const configurations = {
      Approved: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        icon: <ShieldCheck className="w-4 h-4" />,
      },
      Pending: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
        icon: <ShieldExclamation className="w-4 h-4" />,
      },
      Rejected: {
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/20",
        icon: <ShieldExclamation className="w-4 h-4" />,
      },
    };
    const current = configurations[status] || configurations.Pending;

    return (
      <div
        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${current.bg} ${current.text} ${current.border}`}
      >
        {current.icon}
        {status}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-3 sm:p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto bg-[#1C1C1E] border border-[#2A2A2C] rounded-xl shadow-xl overflow-hidden">

        {/* ======================================================================= */}
        {/* STATE 1: EMPTY PROMPT STATE                                             */}
        {/* ======================================================================= */}
        {viewState === "empty" && (
          <div className="p-6 sm:p-10 md:p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="p-3 sm:p-4 bg-[#2A2A2C] border border-[#3A3A3C] rounded-full text-zinc-400">
              <Factory className="w-8 h-8 sm:w-12 sm:h-12" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-200">
              No Company Registered
            </h2>
            <p className="text-sm text-zinc-400 max-w-xs sm:max-w-sm">
              To start creating or managing active job listings, you first need
              to register and profile your workplace organization.
            </p>
            <Button
              onPress={() => setViewState("edit")}
              className="mt-2 px-5 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-[#E4E4E7] text-sm w-full sm:w-auto"
            >
              Register Company
            </Button>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STATE 2: READ-ONLY PROFILE DISPLAY VIEW                                 */}
        {/* ======================================================================= */}
        {viewState === "view" && (
          <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-4 pb-5 sm:pb-6 border-b border-[#2A2A2C]">
              {/* Top row: logo + name + badges */}
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4">
                <img
                  src={companyData.logo}
                  alt="Company Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#2A2A2C] border border-[#3A3A3C] object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
                    {companyData.name}
                  </h1>
                  <p className="text-sm text-zinc-400 truncate">
                    {companyData.industry} • {companyData.employeeCount}
                  </p>
                </div>
              </div>

              {/* Action row: badge + edit button */}
              <div className="flex items-center gap-3 flex-wrap">
                {renderStatusBadge(companyData.status)}
                <Button
                  onPress={() => {
                    setLogoUrl(companyData.logo);
                    setIndustry(companyData.industry);
                    setEmployeeCount(companyData.employeeCount);
                    setViewState("edit");
                  }}
                  className="p-2 text-sm text-[#E4E4E7] border border-[#3A3A3C] bg-transparent rounded-lg hover:bg-[#2A2A2C] flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" /> Edit Profile
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-sm">
              <div className="space-y-1">
                <span className="text-zinc-500 font-medium block">
                  Website URL
                </span>
                <a
                  href={companyData.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline flex items-center gap-1.5 break-all"
                >
                  <Globe className="w-4 h-4 flex-shrink-0" /> {companyData.websiteUrl}
                </a>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-medium block">
                  HQ Location
                </span>
                <div className="text-zinc-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 flex-shrink-0" /> {companyData.location}
                </div>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <span className="text-zinc-500 font-medium block">
                  Company Profile Overview
                </span>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-line bg-[#2A2A2C]/40 p-3 sm:p-4 border border-[#3A3A3C]/40 rounded-lg text-sm">
                  {companyData.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STATE 3: INTERACTIVE FORM ENTRY ARCHITECTURE                            */}
        {/* ======================================================================= */}
        {viewState === "edit" && (
          <Form
            validationBehavior="native"
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8"
          >
            <Fieldset legend="Company Specifications" className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                {/* Company Name */}
                <TextField
                  isRequired
                  name="companyName"
                  defaultValue={companyData.name}
                  className="flex flex-col gap-1"
                >
                  <Label className="text-sm font-medium text-[#E4E4E7]">
                    Company Name
                  </Label>
                  <Input
                    placeholder="e.g. Acme Corp"
                    className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2.5 sm:py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none w-full"
                  />
                </TextField>

                {/* Industry Category Dropdown */}
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium text-[#E4E4E7]">
                    Industry / Category
                  </Label>
                  <Select
                    placeholder="Select industry"
                    selectedKey={industry}
                    onSelectionChange={(key) => setIndustry(String(key))}
                    className="w-full"
                  >
                    <Select.Trigger className="w-full bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2.5 sm:py-2 text-sm text-white flex items-center justify-between">
                      <Select.Value className="text-white data-[placeholder]:text-zinc-500" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#1C1C1E] border border-[#2A2A2C] rounded-lg overflow-hidden w-[--trigger-width]">
                      <ListBox className="py-1">
                        {[
                          "Technology",
                          "Healthcare",
                          "Finance",
                          "Education",
                          "Design",
                        ].map((item) => (
                          <ListBox.Item
                            key={item}
                            id={item}
                            textValue={item}
                            className="px-3 py-2.5 sm:py-2 text-sm text-white hover:bg-[#2A2A2C] cursor-pointer"
                          >
                            <Label>{item}</Label>
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Website URL Input with static Prefix box */}
                <TextField
                  isRequired
                  name="websiteUrl"
                  defaultValue={companyData.websiteUrl}
                  className="flex flex-col gap-1"
                >
                  <Label className="text-sm font-medium text-[#E4E4E7]">
                    Website URL
                  </Label>
                  <div className="flex rounded-lg overflow-hidden border border-[#3A3A3C] bg-[#2A2A2C]">
                    <div className="bg-[#222224] text-zinc-400 text-xs sm:text-sm px-2 sm:px-3 flex items-center border-r border-[#3A3A3C] select-none whitespace-nowrap">
                      https://
                    </div>
                    <Input
                      placeholder="www.company.com"
                      className="w-full bg-transparent px-3 py-2.5 sm:py-2 text-sm text-white placeholder-zinc-500 focus-visible:outline-none min-w-0"
                    />
                  </div>
                </TextField>

                {/* Location Input with internal Left absolute Icon */}
                <TextField
                  isRequired
                  name="location"
                  defaultValue={companyData.location}
                  className="flex flex-col gap-1"
                >
                  <Label className="text-sm font-medium text-[#E4E4E7]">
                    Location
                  </Label>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-3 text-zinc-400 pointer-events-none w-4 h-4" />
                    <Input
                      placeholder="City, Country"
                      className="w-full bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none"
                    />
                  </div>
                </TextField>

                {/* Employee Count Dropdown */}
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium text-[#E4E4E7]">
                    Employee Count Range
                  </Label>
                  <Select
                    placeholder="Select scale"
                    selectedKey={employeeCount}
                    onSelectionChange={(key) => setEmployeeCount(String(key))}
                    className="w-full"
                  >
                    <Select.Trigger className="w-full bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2.5 sm:py-2 text-sm text-white flex items-center justify-between">
                      <Select.Value className="text-white data-[placeholder]:text-zinc-500" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#1C1C1E] border border-[#2A2A2C] rounded-lg overflow-hidden w-[--trigger-width]">
                      <ListBox className="py-1">
                        {[
                          "1-10 employees",
                          "11-50 employees",
                          "51-200 employees",
                          "201-500 employees",
                          "500+ employees",
                        ].map((item) => (
                          <ListBox.Item
                            key={item}
                            id={item}
                            textValue={item}
                            className="px-3 py-2.5 sm:py-2 text-sm text-white hover:bg-[#2A2A2C] cursor-pointer"
                          >
                            <Label>{item}</Label>
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* ImgBB Async Image Uploader Box */}
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium text-[#E4E4E7]">
                    Company Logo
                  </Label>
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <label className="w-14 h-14 bg-[#2A2A2C] border border-[#3A3A3C] border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-zinc-400 transition-colors relative flex-shrink-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <ArrowUpFromLine className="w-5 h-5 text-zinc-400" />
                    </label>
                    <div className="text-xs space-y-0.5 flex-1 min-w-0">
                      <p className="font-medium text-zinc-200">
                        {logoUploading
                          ? "Uploading to ImgBB..."
                          : logoUrl
                            ? "✓ Logo Loaded"
                            : "Upload image"}
                      </p>
                      <p className="text-zinc-500">PNG, JPG up to 5MB</p>
                    </div>
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded border border-[#3A3A3C] flex-shrink-0"
                      />
                    )}
                  </div>
                </div>

                {/* Full-width Summary Description Area */}
                <div className="sm:col-span-2">
                  <TextField
                    isRequired
                    name="description"
                    defaultValue={companyData.description}
                    className="flex flex-col gap-1"
                  >
                    <Label className="text-sm font-medium text-[#E4E4E7]">
                      Brief Description
                    </Label>
                    <TextArea
                      placeholder="Tell us about your company's mission and culture..."
                      rows={4}
                      className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2.5 sm:py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none resize-none w-full"
                    />
                  </TextField>
                </div>
              </div>
            </Fieldset>

            {/* Action Panel */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#2A2A2C]">
              <Button
                type="button"
                onPress={() =>
                  setViewState(companyData.name ? "view" : "empty")
                }
                className="w-full sm:w-auto px-5 py-2.5 sm:py-2 text-sm text-[#E4E4E7] border border-[#3A3A3C] bg-transparent rounded-lg hover:bg-[#2A2A2C] text-center"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-2 text-sm bg-white text-black font-semibold rounded-lg hover:bg-[#E4E4E7] text-center"
              >
                Register Company
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}