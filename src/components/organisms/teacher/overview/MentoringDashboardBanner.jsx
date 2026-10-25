import { HeartHandshake } from "lucide-react";

export default function MentoringDashboardBanner({
    stats,
    newRequestCount,
    onReviewRequests,
}) {
    return (
        <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f3460] via-[#1d4ed8] to-[#2563eb] p-6 text-white shadow-lg">
            <div className="relative z-10">
                <div className="mb-2 flex items-center gap-2">
                    <HeartHandshake size={18} className="opacity-80" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest opacity-75">
                        Faculty Counselling Portal
                    </span>
                </div>
                <h2 className="text-xl font-bold">Your Mentoring Dashboard</h2>
                <p className="mt-1 max-w-lg text-sm opacity-75">
                    {stats.assignedStudentsCount} students assigned ·{" "}
                    {stats.pendingAppointmentsCount} appointment requests awaiting ·
                    Avg class performance {stats.averageClassPerformance}%
                </p>
                {newRequestCount > 0 && (
                    <button
                        type="button"
                        onClick={onReviewRequests}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2 text-[12px] font-bold text-white backdrop-blur transition hover:bg-white/30"
                    >
                        📬 {newRequestCount} New Request
                        {newRequestCount > 1 ? "s" : ""} — Review Now
                    </button>
                )}
            </div>
            <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-white/5" />
            <div className="absolute bottom-4 right-16 h-16 w-16 rounded-full bg-white/5" />
        </section>
    );
}
