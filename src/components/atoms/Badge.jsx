export default function Badge({
    children,
    variant = "default",
    size = "sm",
    className = "",
}) {
    const variantStyles = {
        default: "bg-slate-100 text-slate-700 border-slate-200",
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        pending: "bg-amber-50 text-amber-700 border-amber-200",
        danger: "bg-red-50 text-red-700 border-red-200",
        info: "bg-blue-50 text-blue-700 border-blue-200",
        purple: "bg-purple-50 text-purple-700 border-purple-200",
        rose: "bg-rose-50 text-rose-700 border-rose-200",
    };

    const sizeStyles = {
        xs: "text-[10px] px-1.5 py-0.5",
        sm: "text-[11px] px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
    };

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md border font-semibold ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size]} ${className}`}
        >
            {children}
        </span>
    );
}
