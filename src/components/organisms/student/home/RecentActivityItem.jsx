import { CalendarCheck, CheckCircle2 } from "lucide-react";

export default function RecentActivityItem({ activity }) {
    const Icon = activity.kind === "appointment" ? CalendarCheck : CheckCircle2;
    const iconColor =
        activity.kind === "appointment" ? "text-blue-600" : "text-emerald-600";

    return (
        <div className="flex items-center gap-3 text-xs text-slate-600">
            <Icon size={16} className={`shrink-0 ${iconColor}`} />
            <span>{activity.text}</span>
        </div>
    );
}
