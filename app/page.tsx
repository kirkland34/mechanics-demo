"use client";
import { useMemo, useState } from "react";
import mechanics from "../data/mechanics.json";
import MechanicCard from "../components/MechanicCard";

export default function HomePage() {
  const [q, setQ] = useState("");
  const [service, setService] = useState("");

  const list = useMemo(() => {
    return (mechanics as any[]).filter((m) => {
      const matchesQ = q ? (m.name.toLowerCase().includes(q.toLowerCase()) || m.city.toLowerCase().includes(q.toLowerCase())) : true;
      const matchesService = service ? m.services.join(" ").toLowerCase().includes(service.toLowerCase()) : true;
      return matchesQ && matchesService;
    }).sort((a,b) => a.distance_km - b.distance_km);
  }, [q, service]);

  return (
    <div>
      <section className="container py-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Find trusted mechanics in <span className="text-accent">Roselle Park, NJ</span>
            </h1>
            <p className="text-white/70 mt-3">
              Compare ratings, services, and distance. Book a repair request in minutes.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <input className="input sm:col-span-2" placeholder="Search by name or city..." value={q} onChange={e => setQ(e.target.value)} />
              <input className="input" placeholder="Filter by service (e.g., brakes)" value={service} onChange={e => setService(e.target.value)} />
            </div>
          </div>
          <div className="card p-6">
            <ul className="text-sm text-white/80 space-y-2">
              <li>✅ Realistic demo with seeded local shops</li>
              <li>⚡ Instant booking request flow (mocked)</li>
              <li>🔐 Login & payments coming next</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="container pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((m) => <MechanicCard key={m.id} m={m} />)}
        </div>
      </section>
    </div>
  );
}
