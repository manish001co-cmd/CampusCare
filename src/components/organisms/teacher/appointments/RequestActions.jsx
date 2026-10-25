import { CheckCircle2, Clock, XCircle } from "lucide-react";

export default function RequestActions({
    request,
    onAction,
    onToggleReschedule,
}) {
    if (request.status === "Accepted") {
        return (
            <div className="flex shrink-0 items-center gap-1.5 self-start rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 size={12} />
                Accepted
            </div>
        );
    }
    if (request.status !== "New") return null;

    return (
        <div className="flex shrink-0 flex-col gap-2">
            <button
                type="button"
                onClick={() => onAction(request.id, "Accepted")}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
                <CheckCircle2 size={12} />
                Accept
            </button>
            <button
                type="button"
                onClick={onToggleReschedule}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-amber-600"
            >
                <Clock size={12} />
                Reschedule
            </button>
            <button
                type="button"
                onClick={() => onAction(request.id, "Rejected")}
                className="flex items-center gap-1.5 rounded-xl bg-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-sm transition hover:bg-slate-300"
            >
                <XCircle size={12} />
                Reject
            </button>
        </div>
    );
}
