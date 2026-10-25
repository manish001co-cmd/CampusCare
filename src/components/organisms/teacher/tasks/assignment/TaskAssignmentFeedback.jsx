import { CheckCircle2 } from "lucide-react";

export default function TaskAssignmentFeedback({ message }) {
    if (!message) return null;

    return (
        <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700"
        >
            <CheckCircle2 size={13} />
            {message}
        </div>
    );
}
