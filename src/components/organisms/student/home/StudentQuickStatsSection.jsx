import { CheckCircle2 } from "lucide-react";
import StatCard from "../../../molecules/StatCard";

export default function StudentQuickStatsSection({ nextAppointment, tasks }) {
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
                subtitle="1 due today"
            />
            <StatCard
                title="Wellbeing check-in"
                value="Complete"
                subtitle="Last updated today"
            />
        </div>
    );
}
