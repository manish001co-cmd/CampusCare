import RecentActivityItem from "./RecentActivityItem";

export default function RecentActivitySection({ activities }) {
    return (
        <section className="mt-6 rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <h2 className="border-b border-slate-100 pb-4 text-sm font-bold text-slate-900">
                Recent activity
            </h2>
            <div className="mt-4 space-y-4">
                {activities.length ? (
                    activities.map((activity) => (
                        <RecentActivityItem
                            key={activity.id}
                            activity={activity}
                        />
                    ))
                ) : (
                    <p className="text-sm text-slate-500">
                        No recent activity recorded.
                    </p>
                )}
            </div>
        </section>
    );
}
