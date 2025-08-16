"use client";
import Link from "next/link";

type Mechanic = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  services: string[];
  price_level: string;
  distance_km: number;
  city: string;
};

export default function MechanicCard({ m }: { m: Mechanic }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{m.name}</h3>
        <div className="badge">{m.rating.toFixed(1)} ★ ({m.reviews})</div>
      </div>
      <div className="text-white/80 text-sm">
        {m.city} • {m.price_level} • {m.distance_km.toFixed(1)} km away
      </div>
      <div className="text-white/70 text-sm">Services: {m.services.join(", ")}</div>
      <div className="flex gap-2 pt-2">
        <Link href={`/mechanic/${m.id}`} className="btn">View</Link>
        <Link href={`/book?mechanic=${m.id}`} className="btn bg-accent">Book</Link>
      </div>
    </div>
  );
}

