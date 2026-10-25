export default function PerformanceStatCard({ label, value, sub, alert }) {
    return (
        <article
            className={`rounded-2xl border p-4 shadow-sm ${
                alert
                    ? "border-rose-200 bg-rose-50/40"
                    : "border-slate-200 bg-white"
            }`}
        >
            <p className="mb-1 text-[11px] font-semibold text-slate-500">{label}</p>
            <p
                className={`text-xl font-extrabold ${
                    alert ? "text-rose-600" : "text-slate-900"
                }`}
            >
                {value}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">{sub}</p>
        </article>
    );
}
