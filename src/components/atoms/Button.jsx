import { Loader2 } from "lucide-react";

export default function Button({
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    className = "",
    type = "button",
    onClick,
    ...props
}) {
    const variantStyles = {
        primary: "bg-[#0c4a3b] text-white hover:bg-[#08362a] shadow-sm",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
        outline: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
        danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white",
        gradient: "bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:-translate-y-0.5",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    };

    const sizeStyles = {
        sm: "h-8 px-3 text-xs rounded-lg",
        md: "h-10 px-4 text-xs font-semibold rounded-xl",
        lg: "h-11 px-5 text-sm font-semibold rounded-xl",
        pill: "h-9 px-4 text-xs font-bold rounded-full",
    };

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`inline-flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98] ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {isLoading && <Loader2 size={15} className="animate-spin" />}
            {children}
        </button>
    );
}
