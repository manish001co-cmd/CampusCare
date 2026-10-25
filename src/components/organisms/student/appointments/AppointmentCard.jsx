import {
    BookOpen,
    Briefcase,
    CheckCircle2,
    Clock,
    Heart,
    XCircle,
} from "lucide-react";
import Badge from "../../../atoms/Badge";

const typeIcons = { academic: BookOpen, career: Briefcase, personal: Heart };
const typeBadges = { academic: "info", career: "purple", personal: "rose" };
const statusBadges = {
    Pending: "pending",
    Accepted: "success",
    Completed: "info",
    Rejected: "danger",
};
const statusIcons = {
    Accepted: CheckCircle2,
    Pending: Clock,
    Rejected: XCircle,
};

export default function AppointmentCard({ appointment }) {
    const TypeIcon = typeIcons[appointment.type] || BookOpen;
    const StatusIcon = statusIcons[appointment.status];

    return (
        <article className="rounded-2xl border border-[#e6e2d8] bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={typeBadges[appointment.type] || "info"}>
                            <TypeIcon size={12} />
                            <span className="capitalize">{appointment.type}</span>
                        </Badge>
                        <Badge variant={statusBadges[appointment.status] || "default"}>
                            {StatusIcon && <StatusIcon size={12} />}
                            <span>{appointment.status}</span>
                        </Badge>
                    </div>
                    <h2 className="mt-2 text-base font-bold text-slate-900">
                        {appointment.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Counsellor:{" "}
                        <strong className="text-slate-700">
                            {appointment.counsellorName}
                        </strong>{" "}
                        · Venue: {appointment.location}
                    </p>
                    {appointment.notes && (
                        <p className="mt-2 rounded-lg bg-slate-50 p-2.5 text-xs italic text-slate-600">
                            "{appointment.notes}"
                        </p>
                    )}
                </div>
                <div className="shrink-0 text-left sm:text-right">
                    <p className="text-xs font-bold text-slate-800">
                        {appointment.date}
                    </p>
                    <p className="text-xs text-slate-500">{appointment.time}</p>
                </div>
            </div>
        </article>
    );
}
