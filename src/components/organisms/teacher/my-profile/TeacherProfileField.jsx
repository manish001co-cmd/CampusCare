export default function TeacherProfileField({ icon, label, value }) {
    return (
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="mb-1 flex items-center gap-2 text-slate-400">
                {icon}
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                    {label}
                </span>
            </div>
            <p className="text-xs font-medium text-slate-800">{value}</p>
        </div>
    );
}
