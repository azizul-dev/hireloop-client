"use client";

import Image from "next/image";
import { Briefcase, Factory, Magnifier, Star } from "@gravity-ui/icons";
import { motion } from "motion/react"


const stats = [
  {
    icon: Briefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Factory,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Magnifier,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Globe Background */}
      <div className="absolute inset-0 flex justify-center items-center -mt-20">
        <Image
          src="/images/globe.png" // place globe image in public folder
          alt="Globe"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-2xl font-semibold text-white max-w-3xl mx-auto leading-tight">
            Assisting over <span className="text-violet-400">15,000</span> job
            seekers
            <br />
            find their dream positions.
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg"
          >
            Join our community of job seekers and employers today.
          </motion.p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <Icon className="w-6 h-6 text-white mb-8" />

                <h3 className="text-5xl font-bold text-white mb-3">
                  {item.value}
                </h3>

                <p className="text-gray-300 text-lg">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Purple Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 blur-[180px] rounded-full" />
    </section>
  );
}
