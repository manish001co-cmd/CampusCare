const statuses = ["All", "Pending", "Accepted", "Completed", "Rejected"];

export default function AppointmentStatusTabs({ activeStatus, onSelectStatus }) {
    return (
        <nav
            aria-label="Filter appointments by status"
            className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3"
        >
            {statuses.map((status) => (
                <button
                    key={status}
                    type="button"
                    aria-pressed={activeStatus === status}
                    onClick={() => onSelectStatus(status)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        activeStatus === status
                            ? "bg-[#0c4a3b] text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                >
                    {status}
                </button>
            ))}
        </nav>
    );
}
