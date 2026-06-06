"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  Input,
  TextArea,
  TextField,
  Select,
  ListBox,
  Button,
  Switch,
  Label,
  toast,
} from "@heroui/react";

import { Briefcase, MapPin, Calendar } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobPage() {
  const mockCompany = {
    id: "comp_98723",
    name: "Acme Corp",
    status: "approved",
  };

  const [isRemote, setIsRemote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const finalPayload = {
      ...data,
      category,
      type: jobType,
      currency,
      isRemote,
      companyId: mockCompany.id,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await createJob(finalPayload);
      if (res?.insertedId) {
        toast.success("Job posted successfully!");
        e.target.reset();
        setIsRemote(false);
        redirect(`/dashboard/recruiter`);
      } else {
        toast.error("Failed to post job. Please try again.");
      }
    } catch (err) {
      console.error("Submit job error:", err);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#E4E4E7] flex items-center justify-center p-3 sm:p-4 md:p-8">
      <div className="w-full max-w-3xl bg-[#1C1C1E] rounded-xl border border-[#2A2A2C] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-[#2A2A2C]">
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <Briefcase className="text-zinc-400" size={20} /> Post a New Job
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">
            Fill out the position details below to list it live on HireLoop.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-[#2A2A2C] px-3 py-1.5 rounded-md text-xs text-[#A1A1AA]">
            <span>Posting as:</span>
            <strong className="text-white font-medium">{mockCompany.name}</strong>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        {/* Form */}
        <Form
          validationBehavior="native"
          onSubmit={handleSubmit}
          className="p-6 space-y-8"
        >
          {/* SECTION 1: Job Info */}
          <Fieldset legend="Job Information" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Job Title */}
              <TextField isRequired name="title" className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#E4E4E7]">Job Title</Label>
                <Input
                  placeholder="e.g. Senior Frontend Engineer"
                  className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none"
                />
              </TextField>

              {/* Job Category */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#E4E4E7]">Job Category *</Label>
                <Select
                  placeholder="Select category"
                  selectedKey={category}
                  onSelectionChange={(key) => setCategory(String(key))}
                  className="w-full"
                >
                  <Select.Trigger className="w-full bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white flex items-center justify-between">
                    <Select.Value className="text-white data-[placeholder]:text-zinc-500" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1C1C1E] border border-[#2A2A2C] rounded-lg overflow-hidden">
                    <ListBox className="py-1">
                      {["Technology", "Design", "Marketing", "Sales"].map((item) => (
                        <ListBox.Item
                          key={item}
                          id={item}
                          textValue={item}
                          className="px-3 py-2 text-sm text-white hover:bg-[#2A2A2C] cursor-pointer"
                        >
                          <Label>{item}</Label>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Job Type */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#E4E4E7]">Job Type *</Label>
                <Select
                  placeholder="Select job type"
                  selectedKey={jobType}
                  onSelectionChange={(key) => setJobType(String(key))}
                  className="w-full"
                >
                  <Select.Trigger className="w-full bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white flex items-center justify-between">
                    <Select.Value className="text-white data-[placeholder]:text-zinc-500" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1C1C1E] border border-[#2A2A2C] rounded-lg overflow-hidden">
                    <ListBox className="py-1">
                      {["Full-time", "Part-time", "Contract", "Internship"].map((item) => (
                        <ListBox.Item
                          key={item}
                          id={item}
                          textValue={item}
                          className="px-3 py-2 text-sm text-white hover:bg-[#2A2A2C] cursor-pointer"
                        >
                          <Label>{item}</Label>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Remote Switch */}
              <div className="flex flex-col gap-1 justify-end pb-1">
                <Label className="text-sm font-medium text-[#E4E4E7]">Work Location Mode</Label>
                <div className="flex items-center h-10 bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3">
                  <Switch
                    isSelected={isRemote}
                    onChange={setIsRemote}
                    className="flex items-center justify-between w-full"
                  >
                    <Switch.Control className="w-10 h-6 bg-zinc-700 data-[selected]:bg-white rounded-full p-1 transition-colors flex items-center shrink-0">
                      <Switch.Thumb className="w-4 h-4 bg-black rounded-full shadow-md transition-transform data-[selected]:translate-x-4" />
                    </Switch.Control>
                    <Label className="ml-3 text-sm text-[#A1A1AA] cursor-pointer flex-1">
                      Is this a fully remote role?
                    </Label>
                  </Switch>
                </div>
              </div>

              {/* Location (conditional) */}
              {!isRemote && (
                <TextField isRequired={!isRemote} name="location" className="flex flex-col gap-1">
                  <Label className="text-sm font-medium text-[#E4E4E7]">Location</Label>
                  <div className="relative flex items-center">
                    <MapPin size={16} className="absolute left-3 text-zinc-400 pointer-events-none" />
                    <Input
                      placeholder="City, Country"
                      className="w-full bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none"
                    />
                  </div>
                </TextField>
              )}

              {/* Deadline */}
              <TextField isRequired name="deadline" className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#E4E4E7]">Application Deadline</Label>
                <div className="relative flex items-center">
                  <Calendar size={16} className="absolute left-3 text-zinc-400 pointer-events-none" />
                  <Input
                    type="date"
                    className="w-full bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg pl-8 pr-3 py-2 text-sm text-white focus-visible:border-white focus-visible:outline-none [color-scheme:dark]"
                  />
                </div>
              </TextField>

              {/* Salary Range + Currency */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextField isRequired name="salaryMin" className="flex flex-col gap-1">
                  <Label className="text-sm font-medium text-[#E4E4E7]">Min Salary</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none"
                  />
                </TextField>

                <TextField isRequired name="salaryMax" className="flex flex-col gap-1">
                  <Label className="text-sm font-medium text-[#E4E4E7]">Max Salary</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none"
                  />
                </TextField>

                {/* Currency */}
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium text-[#E4E4E7]">Currency</Label>
                  <Select
                    selectedKey={currency}
                    onSelectionChange={(key) => setCurrency(String(key))}
                    className="w-full"
                  >
                    <Select.Trigger className="w-full bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white flex items-center justify-between">
                      <Select.Value className="text-white" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#1C1C1E] border border-[#2A2A2C] rounded-lg overflow-hidden">
                      <ListBox className="py-1">
                        {[
                          { id: "USD", label: "USD ($)" },
                          { id: "EUR", label: "EUR (€)" },
                          { id: "GBP", label: "GBP (£)" },
                        ].map((item) => (
                          <ListBox.Item
                            key={item.id}
                            id={item.id}
                            textValue={item.label}
                            className="px-3 py-2 text-sm text-white hover:bg-[#2A2A2C] cursor-pointer"
                          >
                            <Label>{item.label}</Label>
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

            </div>
          </Fieldset>

          <hr className="border-[#2A2A2C]" />

          {/* SECTION 2: Job Details */}
          <Fieldset legend="Job Details & Description" className="space-y-4">

            <TextField isRequired name="responsibilities" className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-[#E4E4E7]">Responsibilities</Label>
              <TextArea
                placeholder="Outline day-to-day duties..."
                rows={4}
                className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none resize-y"
              />
            </TextField>

            <TextField isRequired name="requirements" className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-[#E4E4E7]">Requirements</Label>
              <TextArea
                placeholder="List required skills..."
                rows={4}
                className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none resize-y"
              />
            </TextField>

            <TextField name="benefits" className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-[#E4E4E7]">Benefits (Optional)</Label>
              <TextArea
                placeholder="Health insurance, remote stipends..."
                rows={3}
                className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus-visible:border-white focus-visible:outline-none resize-y"
              />
            </TextField>

          </Fieldset>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#2A2A2C]">
            <Button
              type="button"
              className="w-full sm:w-auto px-4 py-2 text-sm text-[#E4E4E7] border border-[#3A3A3C] bg-transparent rounded-lg hover:bg-[#2A2A2C] text-center"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full sm:w-auto px-4 py-2 text-sm bg-white text-black font-semibold rounded-lg hover:bg-[#E4E4E7] text-center"
            >
              Publish Job
            </Button>
          </div>
        </Form>

      </div>
    </div>
  );
}