export default function StatCard({
    title,
    value,
    description,
    icon: Icon,
    color = "blue",
}) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-emerald-50 text-emerald-600",
        purple: "bg-violet-50 text-violet-600",
        orange: "bg-orange-50 text-orange-600",
    };

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        {value}
                    </h3>
                </div>

                <span className={`rounded-xl p-3 ${colors[color] || colors.blue}`}>
                    <Icon size={23} />
                </span>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
                {description}
            </p>
        </article>
    );
}