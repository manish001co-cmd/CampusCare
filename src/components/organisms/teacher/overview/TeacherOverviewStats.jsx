import { Calendar, CheckSquare, TrendingUp, Users } from "lucide-react";
import TeacherOverviewStatCard from "./TeacherOverviewStatCard";

export default function TeacherOverviewStats({ stats, onNavigate }) {
    const cards = [
        {
            icon: Users,
            label: "Assigned Students",
            value: stats.assignedStudentsCount,
            color: "bg-blue-50 text-blue-700",
            target: "My Students",
        },
        {
            icon: Calendar,
            label: "Pending Requests",
            value: stats.pendingAppointmentsCount,
            color: "bg-amber-50 text-amber-700",
            target: "Appointments",
        },
        {
            icon: CheckSquare,
            label: "Open Tasks",
            value: stats.openTasksCount,
            color: "bg-purple-50 text-purple-700",
            target: "Tasks",
        },
        {
            icon: TrendingUp,
            label: "Avg Performance",
            value: `${stats.averageClassPerformance}%`,
            color: "bg-emerald-50 text-emerald-700",
            target: "Performance",
        },
    ];

    return (
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {cards.map((card) => (
                <TeacherOverviewStatCard
                    key={card.label}
                    {...card}
                    onClick={() => onNavigate(card.target)}
                />
            ))}
        </div>
    );
}
