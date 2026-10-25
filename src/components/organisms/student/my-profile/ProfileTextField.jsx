export default function ProfileTextField({
    label,
    value,
    placeholder,
    onChange,
}) {
    return (
        <div>
            <label className="block text-xs font-semibold text-slate-700">
                {label}
            </label>
            <input
                type="text"
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3.5 text-xs text-slate-800 outline-none focus:border-[#0f4437] focus:ring-2 focus:ring-[#0f4437]/10"
                placeholder={placeholder}
            />
        </div>
    );
}
