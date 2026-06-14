"use client";

import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  Description,
  FieldError,
} from "@heroui/react";
import {
  Person,
  Flag,
  Smartphone,
  Link,
  FileText,
  At,
  TextAlignLeft,
} from "@gravity-ui/icons";
import { useState } from "react";
import { submitApplication } from "@/lib/actions/applications";
import { toast } from "sonner";

const JobApply = ({ job, applicant }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      jobId: job._id,
      jobTitle: job.title,
      companyName: job.companyName,
      applicantId: applicant?.id,
      status: 'applied',
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      resumeLink: formData.get("resumeLink"),
      portfolioLink: formData.get("portfolioLink"),
      coverLetter: formData.get("coverLetter"),
    };
    const res = await submitApplication(payload);
    toast.success("Application submitted successfully!");
    console.log("Application payload:", payload);
    // TODO: submit to API
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-6">
        <p className="text-xs text-neutral-500 mb-1">Applying for</p>
        <h2 className="text-2xl font-bold tracking-tight">{job?.title}</h2>
        <p className="text-sm text-neutral-400 mt-1">{job?.companyName}</p>
      </div>

      {/* Form */}
      <Form
        onSubmit={handleSubmit}
        validationBehavior="native"
        className="bg-[#121214] border border-neutral-800 rounded-2xl p-6 space-y-5"
      >
        <p className="text-sm font-semibold text-neutral-300 pb-1 border-b border-neutral-800">
          Required Information
        </p>

        {/* Full Name */}
        <TextField isRequired name="fullName" className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
            <Person className="w-4 h-4 text-neutral-500" /> Full Name
          </Label>
          <Input
            placeholder="John Doe"
            className="bg-[#1C1C1E] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus-visible:border-neutral-500 focus-visible:outline-none w-full"
          />
          <FieldError className="text-xs text-red-400 mt-0.5" />
        </TextField>

        <TextField isRequired name="email" className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
            <At className="w-4 h-4 text-neutral-500" /> Email
          </Label>
          <Input
            type="email"
            placeholder="john@example.com"
            className="bg-[#1C1C1E] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus-visible:border-neutral-500 focus-visible:outline-none w-full"
          />
          <FieldError className="text-xs text-red-400 mt-0.5" />
        </TextField>

        {/* Country */}
        <TextField isRequired name="country" className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
            <Flag className="w-4 h-4 text-neutral-500" /> Country
          </Label>
          <Input
            placeholder="Bangladesh"
            className="bg-[#1C1C1E] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus-visible:border-neutral-500 focus-visible:outline-none w-full"
          />
          <FieldError className="text-xs text-red-400 mt-0.5" />
        </TextField>

        {/* Phone */}
        <TextField isRequired name="phone" className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-neutral-500" /> Phone Number
          </Label>
          <Input
            type="tel"
            placeholder="+880 1700 000000"
            className="bg-[#1C1C1E] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus-visible:border-neutral-500 focus-visible:outline-none w-full"
          />
          <FieldError className="text-xs text-red-400 mt-0.5" />
        </TextField>

        {/* Resume Link */}
        <TextField
          isRequired
          name="resumeLink"
          className="flex flex-col gap-1"
        >
          <Label className="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-neutral-500" /> Resume Link
          </Label>
          <Input
            type="url"
            placeholder="https://drive.google.com/your-resume"
            className="bg-[#1C1C1E] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus-visible:border-neutral-500 focus-visible:outline-none w-full"
          />
          <Description className="text-xs text-neutral-600">
            Google Drive, Dropbox, or any public link
          </Description>
          <FieldError className="text-xs text-red-400 mt-0.5" />
        </TextField>

        {/* Optional Section */}
        <p className="text-sm font-semibold text-neutral-300 pt-2 pb-1 border-b border-neutral-800">
          Optional Information
        </p>

        {/* Portfolio */}
        <TextField name="portfolioLink" className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
            <Link className="w-4 h-4 text-neutral-500" /> Portfolio / LinkedIn
          </Label>
          <Input
            type="url"
            placeholder="https://yourportfolio.com"
            className="bg-[#1C1C1E] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus-visible:border-neutral-500 focus-visible:outline-none w-full"
          />
        </TextField>

        {/* Cover Letter */}
        <TextField name="coverLetter" className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
            <TextAlignLeft className="w-4 h-4 text-neutral-500" /> Cover
            Letter
          </Label>
          <textarea
            name="coverLetter"
            rows={4}
            placeholder="Tell us why you're a great fit..."
            className="bg-[#1C1C1E] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus-visible:border-neutral-500 focus:outline-none resize-none w-full"
          />
          <Description className="text-xs text-neutral-600">
            Max 500 characters
          </Description>
        </TextField>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
            className="flex-1 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors text-sm cursor-pointer"
          >
            Submit Application
          </Button>
          <Button
            type="reset"
            className="px-6 py-3 bg-transparent border border-neutral-800 text-neutral-400 font-medium rounded-xl hover:bg-neutral-900 transition-colors text-sm cursor-pointer"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobApply;
