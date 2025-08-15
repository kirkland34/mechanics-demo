import mechanics from "../../../data/mechanics.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function MechanicProfile({ params }: { params: { id: string }}) {
  const m = (mechanics as any[]).find((x) => x.id === params.id);
  if (!m) return notFound();

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card p-6">
            <h1 className="text-2xl font-semibold">{m.name}</h1>
            <div className="text-white/70 mt-1">
              {m.address} • {m.city} • {m.hours}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(m.services as string[]).map(s => (
                <span key={s} className="badge">{s}</span>
              ))}
            </div>
            <p className="text-white/70 mt-4">
              {m.reviews} recent reviews • Rated {m.rating.toFixed(1)} / 5
            </p>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="card p-6">
            <div className="text-sm text-white/70">Phone</div>
            <div className="text-lg">{m.phone}</div>
            <Link href={`/book?mechanic=${m.id}`} className="btn mt-4 w-full">Request Booking</Link>
          </div>
          <div className="card p-6">
            <div className="text-sm text-white/70 mb-2">Estimated price level</div>
            <div className="text-xl">{m.price_level}</div>
            <div className="text-sm text-white/60 mt-2">Final pricing varies by service.</div>
          </div>
        </aside>
      </div>
      <div className="mt-8">
        <Link href="/" className="text-white/70 underline">← Back to results</Link>
      </div>
    </div>
  );
}
