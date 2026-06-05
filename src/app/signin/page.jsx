"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, Input, Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      console.log("SIGN IN RESULT:", result);

      if (result?.error) {
        toast.error(result.error.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-sm text-default-500 hover:text-default-900 transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Welcome Back</h1>

          <p className="text-default-500 mt-2">
            Sign in to your account to continue.
          </p>
        </div>

        <form onSubmit={handleSignin} className="space-y-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="bordered"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="bordered"
          />

          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          New to Hire Loop?{" "}
          <Link href="/signup" className="font-semibold text-primary">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}