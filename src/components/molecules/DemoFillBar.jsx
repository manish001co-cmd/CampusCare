export default function DemoFillBar({
    roles,
    selectedRole,
    onQuickFill,
}) {
    return (
        <div className="mb-3.5 flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs text-slate-600">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                Demo Fill:
            </span>
            {roles.map((r) => (
                <button
                    key={r.value}
                    type="button"
                    onClick={() => onQuickFill(r)}
                    className={`rounded px-1.5 py-0.5 text-[11px] font-medium transition ${
                        selectedRole === r.value
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                >
                    {r.label}
                </button>
            ))}
        </div>
    );
}
