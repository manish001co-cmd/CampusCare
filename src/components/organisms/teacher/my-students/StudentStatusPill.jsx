const statusStyles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Follow-up due": "bg-amber-50 text-amber-700 border-amber-200",
    "High priority": "bg-rose-50 text-rose-700 border-rose-200",
};

export default function StudentStatusPill({ status }) {
    return (
        <span
            className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                statusStyles[status] || "bg-slate-50 text-slate-600 border-slate-200"
            }`}
        >
            {status}
        </span>
    );
}
