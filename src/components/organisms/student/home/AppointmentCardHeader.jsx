export default function AppointmentCardHeader({ onViewAll }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold text-slate-900">
                Upcoming appointment
            </h2>
            {onViewAll && (
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-xs font-medium text-[#0f4437] hover:underline"
                >
                    View all
                </button>
            )}
        </div>
    );
}
