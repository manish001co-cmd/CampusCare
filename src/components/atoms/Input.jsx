export default function Input({
    id,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    icon: Icon,
    rightElement,
    required = false,
    autoComplete,
    className = "",
    ...props
}) {
    return (
        <div
            className={`flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 transition focus-within:border-[#0c4a3b] focus-within:ring-4 focus-within:ring-[#0c4a3b]/10 ${className}`}
        >
            {Icon && <Icon size={17} className="shrink-0 text-slate-400" />}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                className="h-full w-full min-w-0 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
                {...props}
            />
            {rightElement}
        </div>
    );
}
