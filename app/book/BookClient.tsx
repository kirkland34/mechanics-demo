"use client";

import { useSearchParams, useRouter } from "next/navigation";
import mechanics from "../../data/mechanics.json";
import { useMemo, useState } from "react";

export default function BookClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const id = sp.get("mechanic");

  const m = useMemo(() => (mechanics as any[]).find(x => x.id === id), [id]);

  const [form, setForm] = useState({ name: "", email: "", phone: "", vehicle: "", issue: "", date: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (k: string, v: string) => setForm(prev => ({...prev, [k]: v}));

  const submit = () => { setSubmitted(true); };

  if (submitted) {
    return (
      <div className="container py-10">
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-semibold">Request received ✅</h1>
          <p className="text-white/70 mt-2">
            We sent your request to {m ? m.name : "the selected shop"}. You’ll get a confirmation by email.
          </p>
          <button onClick={() => router.push("/")} className="btn mt-6">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="card p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold">Request a booking</h1>
        <p className="text-white/70 mt-1">
          {m ? `Preferred shop: ${m.name}` : "Choose a shop on the home page to prefill."}
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <input className="input" placeholder="Full name" value={form.name} onChange={e => update("name", e.target.value)} />
          <input className="input" placeholder="Email" value={form.email} onChange={e => update("email", e.target.value)} />
          <input className="input" placeholder="Phone" value={form.phone} onChange={e => update("phone", e.target.value)} />
          <input className="input" placeholder="Vehicle (e.g., 2017 Honda Civic)" value={form.vehicle} onChange={e => update("vehicle", e.target.value)} />
          <input className="input" placeholder="Preferred date" value={form.date} onChange={e => update("date", e.target.value)} />
          <textarea className="input md:col-span-2" placeholder="Describe the issue (e.g., brake noise, AC not cooling)" value={form.issue} onChange={e => update("issue", e.target.value)} />
        </div>
        <button onClick={submit} className="btn mt-6 w-full">Submit request</button>
      </div>
    </div>
  );
}
