import { CalendarCheck, X } from "lucide-react";

export default function AppointmentModalHeader({ onClose }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf5ef] text-[#0f4437]">
                    <CalendarCheck size={18} />
                </span>
                <h2
                    id="appointment-modal-title"
                    className="text-base font-bold text-slate-900"
                >
                    Request Counselling Session
                </h2>
            </div>
            <button
                type="button"
                onClick={onClose}
                aria-label="Close appointment request"
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
                <X size={18} />
            </button>
        </div>
    );
}
