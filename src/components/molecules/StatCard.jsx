export default function StatCard({
    title,
    value,
    subtitle,
    badge,
    className = "",
}) {
    return (
        <div
            className={`rounded-2xl border border-[#e6e2d8] bg-white p-5 shadow-sm transition hover:shadow-md ${className}`}
        >
            <p className="text-xs font-medium text-slate-500">
                {title}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
                {value}
            </p>
            {subtitle && (
                <p className="mt-1 text-xs text-slate-500">
                    {subtitle}
                </p>
            )}
            {badge && (
                <div className="mt-2">
                    {badge}
                </div>
            )}
        </div>
    );
}
