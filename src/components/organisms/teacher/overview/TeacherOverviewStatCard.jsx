export default function TeacherOverviewStatCard({
    icon: Icon,
    label,
    value,
    color,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
        >
            <span
                className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-xl ${color}`}
            >
                <Icon size={16} />
            </span>
            <p className="text-xl font-extrabold text-slate-900">{value}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">{label}</p>
        </button>
    );
}
