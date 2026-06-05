"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  Input,
  TextArea, // Fixed casing from TextArea -> Textarea based on HeroUI docs
  Select,
  ListBox,
  Button,
  Switch,
  Label,
} from "@heroui/react";

// Using valid Gravity UI Icons
import { Briefcase, MapPin, Calendar } from "@gravity-ui/icons";

export default function PostJobPage() {
  const mockCompany = {
    id: "comp_98723",
    name: "Acme Corp",
    status: "approved",
  };

  // Form controlled states
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

    // Build the final schema to reflect required submit guidelines
    const finalPayload = {
      ...data,
      category,
      type: jobType,
      currency,
      isRemote,
      companyId: mockCompany.id,
      status: "active", // Post live instantly
      createdAt: new Date().toISOString(),
    };

    console.log("Submitting Job Payload:", finalPayload);

    setTimeout(() => {
      alert("Job posted successfully!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#E4E4E7] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-[#1C1C1E] rounded-xl border border-[#2A2A2C] shadow-2xl overflow-hidden">
        
        {/* Style Guide Blueprint Header */}
        <div className="p-6 border-b border-[#2A2A2C]">
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <Briefcase className="text-zinc-400" size={20} /> Post a New Job
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">
            Fill out the position details below to list it live on HireLoop.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-[#2A2A2C] px-3 py-1.5 rounded-md text-xs text-[#A1A1AA]">
            <span>Posting as:</span>
            <strong className="text-white font-medium">
              {mockCompany.name}
            </strong>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        {/* HeroUI v3 Native Form Wrap */}
        <Form
          validationBehavior="native"
          onSubmit={handleSubmit}
          className="p-6 space-y-8"
        >
          {/* SECTION 1: Job Info */}
          <Fieldset
            legend="Job Information"
            classNames={{
              legend: "text-base font-medium text-white mb-4",
              wrapper: "grid grid-cols-1 md:grid-cols-2 gap-4",
            }}
          >
            <Input
              required // Using correct Next.js camelCase standard
              label="Job Title"
              name="title"
              placeholder="e.g. Senior Frontend Engineer"
              labelPlacement="outside"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#2A2A2C] border-[#3A3A3C] text-white focus-within:border-white",
                label: "text-[#E4E4E7]",
              }}
            />

            {/* Job Category Dropdown */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[#E4E4E7]">
                Job Category *
              </span>
              <Select
                className="w-full"
                placeholder="Select category"
                variant="bordered"
              >
                <Select.Trigger className="bg-[#2A2A2C] border-[#3A3A3C] text-white">
                  <Select.Value>{category || "Select category"}</Select.Value>
                </Select.Trigger>
                <Select.Popover className="bg-[#1C1C1E] border border-[#2A2A2C]">
                  <ListBox
                    onAction={(key) => setCategory(String(key))}
                    className="text-white"
                  >
                    <ListBox.Item id="Technology" textValue="Technology">
                      Technology
                    </ListBox.Item>
                    <ListBox.Item id="Design" textValue="Design">
                      Design
                    </ListBox.Item>
                    <ListBox.Item id="Marketing" textValue="Marketing">
                      Marketing
                    </ListBox.Item>
                    <ListBox.Item id="Sales" textValue="Sales">
                      Sales
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Job Type Dropdown */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[#E4E4E7]">
                Job Type *
              </span>
              <Select
                className="w-full"
                placeholder="Select job type"
                variant="bordered"
              >
                <Select.Trigger className="bg-[#2A2A2C] border-[#3A3A3C] text-white">
                  <Select.Value>{jobType || "Select job type"}</Select.Value>
                </Select.Trigger>
                <Select.Popover className="bg-[#1C1C1E] border border-[#2A2A2C]">
                  <ListBox
                    onAction={(key) => setJobType(String(key))}
                    className="text-white"
                  >
                    <ListBox.Item id="Full-time" textValue="Full-time">
                      Full-time
                    </ListBox.Item>
                    <ListBox.Item id="Part-time" textValue="Part-time">
                      Part-time
                    </ListBox.Item>
                    <ListBox.Item id="Contract" textValue="Contract">
                      Contract
                    </ListBox.Item>
                    <ListBox.Item id="Internship" textValue="Internship">
                      Internship
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Fixed Working Remote Switch Component Using HeroUI v3 Compounds */}
            <div className="flex flex-col gap-2 justify-end pb-1">
              <span className="text-sm font-medium text-[#E4E4E7]">
                Work Location Mode
              </span>
              <div className="flex items-center h-10 bg-[#2A2A2C] border border-[#3A3A3C] rounded-medium px-3 justify-between">
                {/* Fixed Switch interaction by unifying state bindings via native layout attributes */}
                <Switch 
                  isSelected={isRemote} 
                  onChange={() => setIsRemote(!isRemote)}
                  className="w-full flex items-center justify-between cursor-pointer"
                >
                  <Switch.Control className="w-10 h-6 bg-zinc-700 data-[selected=true]:bg-white rounded-full p-1 transition-colors duration-200 flex items-center">
                    <Switch.Thumb className="w-4 h-4 bg-black rounded-full shadow-md data-[selected=true]:translate-x-4 transition-transform duration-200" />
                  </Switch.Control>
                  <Switch.Content className="ml-3 select-none flex-1">
                    <Label className="text-sm text-[#A1A1AA] cursor-pointer">
                      Is this a fully remote role?
                    </Label>
                  </Switch.Content>
                </Switch>
              </div>
            </div>

            {/* Conditioned Location Selection Input */}
            {!isRemote && (
              <Input
                required={!isRemote}
                label="Location"
                name="location"
                placeholder="City, Country"
                labelPlacement="outside"
                variant="bordered"
                startContent={<MapPin size={16} className="text-zinc-400" />}
                classNames={{
                  inputWrapper: "bg-[#2A2A2C] border-[#3A3A3C] text-white",
                  label: "text-[#E4E4E7]",
                }}
              />
            )}

            <Input
              required
              label="Application Deadline"
              name="deadline"
              type="date"
              labelPlacement="outside"
              variant="bordered"
              startContent={<Calendar size={16} className="text-zinc-400" />}
              classNames={{
                inputWrapper: "bg-[#2A2A2C] border-[#3A3A3C] text-white",
                label: "text-[#E4E4E7]",
              }}
            />

            {/* Financial Scope Block */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <Input
                required
                label="Min Salary"
                name="salaryMin"
                type="number"
                placeholder="0"
                labelPlacement="outside"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-[#2A2A2C] border-[#3A3A3C] text-white",
                  label: "text-[#E4E4E7]",
                }}
              />
              <Input
                required
                label="Max Salary"
                name="salaryMax"
                type="number"
                placeholder="0"
                labelPlacement="outside"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-[#2A2A2C] border-[#3A3A3C] text-white",
                  label: "text-[#E4E4E7]",
                }}
              />

              {/* Currency Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#E4E4E7]">
                  Currency
                </span>
                <Select className="w-full" placeholder="USD" variant="bordered">
                  <Select.Trigger
                    className="bg-[#2A2A2C] border-[#3A3A3C] text-white"
                    startContent={
                      <Briefcase size={16} className="text-zinc-400" />
                    }
                  >
                    <Select.Value>{currency}</Select.Value>
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1C1C1E] border border-[#2A2A2C]">
                    <ListBox
                      onAction={(key) => setCurrency(String(key))}
                      className="text-white"
                    >
                      <ListBox.Item id="USD" textValue="USD">
                        USD ($)
                      </ListBox.Item>
                      <ListBox.Item id="EUR" textValue="EUR">
                        EUR (€)
                      </ListBox.Item>
                      <ListBox.Item id="GBP" textValue="GBP">
                        GBP (£)
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>
          </Fieldset>

          <hr className="border-[#2A2A2C]" />

          {/* SECTION 2: Textarea Core Layout Descriptions */}
          <Fieldset
            legend="Job Details & Description"
            classNames={{
              legend: "text-base font-medium text-white mb-4",
              wrapper: "space-y-4",
            }}
          >
            <TextArea
              required
              label="Responsibilities"
              name="responsibilities"
              placeholder="Outline day-to-day duties..."
              labelPlacement="outside"
              variant="bordered"
              minRows={4}
              classNames={{
                innerWrapper: "bg-[#2A2A2C]",
                inputWrapper: "bg-[#2A2A2C] border-[#3A3A3C] text-white",
                label: "text-[#E4E4E7]",
              }}
            />
            <TextArea
              required
              label="Requirements"
              name="requirements"
              placeholder="List required skills..."
              labelPlacement="outside"
              variant="bordered"
              minRows={4}
              classNames={{
                innerWrapper: "bg-[#2A2A2C]",
                inputWrapper: "bg-[#2A2A2C] border-[#3A3A3C] text-white",
                label: "text-[#E4E4E7]",
              }}
            />
            <TextArea
              label="Benefits (Optional)"
              name="benefits"
              placeholder="Health insurance, remote stipends..."
              labelPlacement="outside"
              variant="bordered"
              minRows={3}
              classNames={{
                innerWrapper: "bg-[#2A2A2C]",
                inputWrapper: "bg-[#2A2A2C] border-[#3A3A3C] text-white",
                label: "text-[#E4E4E7]",
              }}
            />
          </Fieldset>

          {/* Form Confirm Action Elements */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#2A2A2C]">
            <Button
              type="button"
              className="text-[#E4E4E7] border border-[#3A3A3C] bg-transparent hover:bg-[#2A2A2C]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="bg-white text-black font-semibold hover:bg-[#E4E4E7]"
            >
              Publish Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}