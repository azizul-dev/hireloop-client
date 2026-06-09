import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const customerEmail = session.customer_details?.email;

  const planName = session.line_items?.data?.[0]?.description || "Premium Plan";

  if (session.status === "open") {
    return redirect("/");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-black">
      <div className="max-w-lg w-full bg-[#111111] border border-neutral-800 rounded-3xl p-8 text-center shadow-2xl">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Payment Successful 🎉
        </h1>

        <p className="text-neutral-400 mb-6">
          Thank you for subscribing to Hire Loop.
        </p>

        {/* Plan Details */}
        <div className="bg-neutral-900 rounded-xl p-4 mb-4 border border-neutral-800">
          <p className="text-sm text-neutral-500">Activated Plan</p>
          <p className="text-white font-semibold text-lg mt-1">{planName}</p>
        </div>

        {/* Email */}
        <div className="bg-neutral-900 rounded-xl p-4 mb-6 border border-neutral-800">
          <p className="text-sm text-neutral-500">Confirmation Email Sent To</p>
          <p className="font-medium text-white break-all mt-1">
            {customerEmail}
          </p>
        </div>

        <p className="text-sm text-neutral-500 mb-8">
          Your subscription is now active. You can start using all premium
          features immediately.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard"
            className="flex-1 bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-200 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/pricing"
            className="flex-1 border border-neutral-700 text-white py-3 rounded-xl hover:bg-neutral-900 transition"
          >
            Back to Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
