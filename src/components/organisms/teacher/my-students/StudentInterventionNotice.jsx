import { AlertTriangle } from "lucide-react";

export default function StudentInterventionNotice() {
    return (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs text-rose-800">
            <AlertTriangle size={14} className="shrink-0 text-rose-600" />
            <span>
                <strong>Proactive Intervention Required:</strong> Attendance is
                critically below the 75% threshold. Please schedule a follow-up
                session.
            </span>
        </div>
    );
}
