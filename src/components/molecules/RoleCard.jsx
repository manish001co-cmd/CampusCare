import {
    GraduationCap,
    Users,
    Building2,
    ShieldCheck,
    Check,
} from "lucide-react";

const roleIcons = {
    student: GraduationCap,
    teacher: Users,
    hod: Building2,
    admin: ShieldCheck,
};

export default function RoleCard({
    role,
    selected,
    onClick,
}) {
    const Icon = roleIcons[role.value] || GraduationCap;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`group relative flex min-w-0 items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all sm:gap-3 sm:p-3 ${selected
                    ? "border-blue-600 bg-blue-50/80 shadow-sm ring-1 ring-blue-600"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/80"
                }`}
        >
            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${selected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                    }`}
            >
                <Icon size={18} />
            </span>

            <span className="min-w-0 flex-1">
                <span className={`block text-xs font-bold sm:text-sm ${selected ? "text-blue-900" : "text-slate-800"}`}>
                    {role.label}
                </span>

                <span className="block truncate text-[11px] leading-tight text-slate-500">
                    {role.description}
                </span>
            </span>

            <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${selected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
            >
                {selected && <Check size={10} strokeWidth={3} />}
            </span>
        </button>
    );
}
