import { CheckCircle2 } from "lucide-react";
import StatCard from "../../../molecules/StatCard";

export default function StudentQuickStatsSection({
    nextAppointment,
    tasks,
    completedSessions,
}) {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const dueTodayCount = tasks.filter(
        (task) => !task.completed && task.dueDate === today
    ).length;

    return (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
                title="Next appointment"
                value={
                    nextAppointment
                        ? `${nextAppointment.date} · ${nextAppointment.time.split("-")[0]}`
                        : "No upcoming session"
                }
                badge={
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 size={12} />
                        {nextAppointment?.status || "Confirmed"}
                    </span>
                }
            />
            <StatCard
                title="Open tasks"
                value={tasks.filter((task) => !task.completed).length}
                subtitle={`${dueTodayCount} due today`}
            />
            <StatCard
                title="Completed sessions"
                value={completedSessions}
                subtitle="Counselling sessions recorded"
            />
        </div>
    );
}
