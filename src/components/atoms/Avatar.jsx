export default function Avatar({
    name = "User",
    initials,
    size = "md",
    variant = "blue",
    className = "",
}) {
    const computedInitials =
        initials ||
        name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    const sizeStyles = {
        sm: "h-7 w-7 text-[10px]",
        md: "h-8 w-8 text-xs",
        lg: "h-10 w-10 text-sm",
        xl: "h-12 w-12 text-base",
    };

    const variantStyles = {
        blue: "bg-blue-600 text-white",
        teal: "bg-[#0f4437] text-white",
        gradient: "bg-gradient-to-br from-[#0f4437] to-[#1c735e] text-white",
        purple: "bg-purple-600 text-white",
        slate: "bg-slate-200 text-slate-700",
    };

    return (
        <div
            className={`flex shrink-0 items-center justify-center rounded-full font-bold shadow-sm ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
            title={name}
        >
            {computedInitials}
        </div>
    );
}
