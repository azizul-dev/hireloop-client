"use client";

import { Card } from "@heroui/react";

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const PersonsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const LightningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const iconMap = {
  file: <FileIcon />,
  persons: <PersonsIcon />,
  lightning: <LightningIcon />,
  check: <CheckCircleIcon />,
};

export default function StatsCard({ Stats = [] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4">
      {Stats.map((stat) => (
        <Card
          key={stat.label}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px]"
          shadow="none"
        >
          <div className="flex flex-col gap-7 p-5">
            <div className="w-[38px] h-[38px] bg-[#252525] border border-[#333] rounded-lg flex items-center justify-center text-[#aaa]">
              {iconMap[stat.icon] ?? <FileIcon />}
            </div>
            <div>
              <p className="text-[13px] text-[#888] mb-1">{stat.label}</p>
              <p className="text-[26px] font-semibold text-[#f0f0f0] tracking-tight">
                {stat.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}