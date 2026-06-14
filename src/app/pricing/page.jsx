"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { CircleCheck, ChevronDown, ChevronUp } from "@gravity-ui/icons";

const seekerPlans = [
  {
    name: "Free",
    id: "seeker_free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    id: "seeker_pro",
    price: "$19",
    period: "month",
    description: "For serious job seekers",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    cta: "Start Pro",
    highlight: true,
  },
  {
    name: "Premium",
    id: "seeker_premium",
    price: "$39",
    period: "month",
    description: "Maximum career advantage",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
    cta: "Go Premium",
    highlight: false,
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id: "recruiter_free",
    price: "$0",
    period: "forever",
    description: "Great for first-year hiring",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    id: "recruiter_growth",
    price: "$49",
    period: "month",
    description: "Scale your hiring",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Growth",
    highlight: true,
  },
  {
    name: "Enterprise",
    id: "recruiter_enterprise",
    price: "$149",
    period: "month",
    description: "For high-volume hiring teams",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of the current billing period, after which it will revert to the Free plan.",
  },
  {
    question: "Are refunds available?",
    answer:
      "We offer a 7-day money-back guarantee for first-time subscribers. If you are not satisfied within the first 7 days, contact our support team for a full refund.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as PayPal. All payments are securely processed and encrypted.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately, while downgrades apply at the next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "We do not currently offer a free trial, but our Free plan gives you a good sense of the platform. You can upgrade whenever you are ready.",
  },
];

function PlanCard({ plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 space-y-5 transition-all ${
        plan.highlight
          ? "bg-white text-black border-white shadow-xl shadow-white/10 scale-[1.02]"
          : "bg-[#121214] text-white border-neutral-800"
      }`}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-black text-white px-4 py-1 rounded-full border border-neutral-700">
          Most Popular
        </span>
      )}

      <div>
        <h3
          className={`text-lg font-bold ${plan.highlight ? "text-black" : "text-white"}`}
        >
          {plan.name}
        </h3>
        <p
          className={`text-xs mt-1 ${plan.highlight ? "text-neutral-600" : "text-neutral-500"}`}
        >
          {plan.description}
        </p>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-4xl font-extrabold tracking-tight">
          {plan.price}
        </span>
        <span
          className={`text-sm mb-1 ${plan.highlight ? "text-neutral-600" : "text-neutral-500"}`}
        >
          /{plan.period}
        </span>
      </div>

      <ul className="space-y-2.5 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <CircleCheck
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-black" : "text-emerald-400"}`}
            />
            <span
              className={
                plan.highlight ? "text-neutral-700" : "text-neutral-300"
              }
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <form action="/api/checkout_sessions" method="POST">
        <input type="hidden" name="plan_id" value={plan.id} />

        <Button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
            plan.highlight
              ? "bg-black text-white hover:bg-neutral-900"
              : "bg-white text-black hover:bg-neutral-200"
          }`}
        >
          {plan.cta}
        </Button>
      </form>
    </div>
  );
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-neutral-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-white hover:bg-neutral-900 transition-colors cursor-pointer"
      >
        {faq.question}
        {open ? (
          <ChevronUp className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-neutral-400 leading-relaxed border-t border-neutral-800 pt-3">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const [tab, setTab] = useState("seeker");
  const plans = tab === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-neutral-400 text-base max-w-xl mx-auto">
            Whether you are looking for your next opportunity or building your
            team, we have a plan for you.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-[#121214] border border-neutral-800 rounded-xl p-1 mt-4">
            <button
              onClick={() => setTab("seeker")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === "seeker"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setTab("recruiter")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === "recruiter"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-2xl mx-auto">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
