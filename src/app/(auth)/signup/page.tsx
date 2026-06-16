"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { setAuthCookie } from "@/lib/auth";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    // In a real app this would call an API to create the account
    // For demo: just log them in immediately
    setAuthCookie(form.email.trim().toLowerCase());
    setSuccess(true);

    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1500);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500 text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Account Created!</h2>
        <p className="text-muted-foreground text-sm">Redirecting you to the dashboard…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mx-auto mb-2">
          <UserPlus className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Request Access
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill out the form below to get access to the admin panel
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="First Name"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <Input
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <Input
          id="company"
          label="Company Name"
          placeholder="Acme Interiors"
          value={form.company}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Input
          id="email"
          type="email"
          label="Work Email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <Button className="w-full mt-4" size="lg" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have access?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
