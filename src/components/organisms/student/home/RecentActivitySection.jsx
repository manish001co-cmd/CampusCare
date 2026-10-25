import RecentActivityItem from "./RecentActivityItem";

const recentActivities = [
    {
        id: "wellbeing-check-in",
        kind: "task",
        text: "Wellbeing check-in completed · Today, 9:12 AM",
    },
    {
        id: "study-plan",
        kind: "task",
        text: "Study plan task completed · Yesterday",
    },
    {
        id: "appointment-confirmed",
        kind: "appointment",
        text: "Appointment confirmed with Mr. Dilip Menariya · Oct 18, 2026",
    },
];

export default function RecentActivitySection() {
    return (
        <section className="mt-6 rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <h2 className="border-b border-slate-100 pb-4 text-sm font-bold text-slate-900">
                Recent activity
            </h2>
            <div className="mt-4 space-y-4">
                {recentActivities.map((activity) => (
                    <RecentActivityItem
                        key={activity.id}
                        activity={activity}
                    />
                ))}
            </div>
        </section>
    );
}
