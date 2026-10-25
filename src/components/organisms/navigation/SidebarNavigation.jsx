export default function SidebarNavigation({
    items,
    activePage,
    onNavigate,
    onCloseMobile,
}) {
    return (
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Workspace
            </p>
            {items.map(({ label, icon: Icon }) => {
                const selected = activePage === label;
                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => {
                            onNavigate(label);
                            onCloseMobile();
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                            selected
                                ? "bg-blue-600 font-semibold text-white shadow-lg shadow-blue-950/30"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <Icon size={19} />
                        <span>{label}</span>
                    </button>
                );
            })}
        </nav>
    );
}
