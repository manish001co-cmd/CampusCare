import { MapPin } from "lucide-react";

export default function UpcomingAppointmentDetails({ appointment }) {
    return (
        <div className="mt-5 flex items-start gap-4">
            <div className="flex flex-col items-center justify-center rounded-xl bg-slate-100 px-3.5 py-2 text-center text-slate-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    OCT
                </span>
                <span className="text-xl font-extrabold">28</span>
            </div>
            <div>
                <p className="text-xs font-semibold text-slate-500">
                    {appointment.time}
                </p>
                <h3 className="mt-1 text-sm font-bold text-slate-900">
                    {appointment.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin size={13} className="text-slate-400" />
                    {appointment.location} · {appointment.counsellorName}
                </p>
            </div>
        </div>
    );
}
