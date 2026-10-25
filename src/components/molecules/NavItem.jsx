export default function NavItem({
    label,
    icon: Icon,
    isActive,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                isActive
                    ? "bg-[#e8def8] font-semibold text-[#251543] shadow-sm"
                    : "text-[#245245] hover:bg-[#dcf0e4] hover:text-[#0b3329]"
            }`}
        >
            <Icon size={18} className={isActive ? "text-[#4a2e82]" : "text-[#2e6859]"} />
            <span>{label}</span>
        </button>
    );
}
