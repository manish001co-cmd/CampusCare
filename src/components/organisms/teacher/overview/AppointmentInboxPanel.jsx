import { CalendarDays } from "lucide-react";
import AppointmentInboxRow from "./AppointmentInboxRow";

export default function AppointmentInboxPanel({ requests, onViewAll }) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <CalendarDays size={14} />
                    </span>
                    Appointment Inbox
                </h2>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                >
                    View all →
                </button>
            </div>
            {requests.length === 0 ? (
                <p className="py-6 text-center text-xs text-slate-400">
                    No pending appointment requests.
                </p>
            ) : (
                <div className="space-y-2">
                    {requests.slice(0, 3).map((request) => (
                        <AppointmentInboxRow key={request.id} request={request} />
                    ))}
                </div>
            )}
        </section>
    );
}
