export default function LoginHeroFeature({
    icon: Icon,
    title,
    description,
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                <Icon size={18} />
            </span>
            <div>
                <h2 className="text-xs font-semibold text-white">{title}</h2>
                <p className="text-[11px] text-blue-200/70">{description}</p>
            </div>
        </div>
    );
}
