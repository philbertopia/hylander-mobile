"use client";

import { useState } from "react";

export function AdminLogin() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") })
    });
    setIsSubmitting(false);
    if (!response.ok) {
      setError("That password did not work.");
      return;
    }
    window.location.reload();
  };

  return (
    <form className="mx-auto grid w-full max-w-md gap-4 rounded-lg border-2 border-black bg-white p-5 shadow-black" onSubmit={login}>
      <h1 className="text-3xl font-black uppercase">Admin Login</h1>
      <p className="font-bold text-black/70">Use the local admin password from <code>ADMIN_PASSWORD</code>. Default dev password is <code>hylander-dev</code>.</p>
      <input className="rounded-lg border-2 border-black p-3" type="password" name="password" placeholder="Password" required />
      <button className="rounded-full bg-hyPink px-4 py-3 font-black uppercase text-white shadow-black" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Checking..." : "Enter Dashboard"}
      </button>
      {error ? <p className="rounded-lg bg-red-100 p-3 font-bold text-red-800">{error}</p> : null}
    </form>
  );
}

