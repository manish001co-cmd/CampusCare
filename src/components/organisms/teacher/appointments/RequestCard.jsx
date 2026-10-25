import { useState } from "react";
import RequestSummary from "./RequestSummary";
import RequestActions from "./RequestActions";
import RequestRescheduleForm from "./RequestRescheduleForm";

export default function RequestCard({ request, onAction }) {
    const [showReschedule, setShowReschedule] = useState(false);
    const [newDate, setNewDate] = useState(request.date);
    const [newTime, setNewTime] = useState(request.time);

    const confirmReschedule = () => {
        onAction(request.id, "Rescheduled", { date: newDate, time: newTime });
        setShowReschedule(false);
    };

    return (
        <article
            className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                request.status === "New"
                    ? "border-blue-200"
                    : request.status === "Accepted"
                      ? "border-emerald-200"
                      : request.status === "Rejected"
                        ? "border-slate-200 opacity-60"
                        : "border-amber-200"
            }`}
        >
            <div className="flex flex-wrap items-start gap-4">
                <RequestSummary request={request} />
                <RequestActions
                    request={request}
                    onAction={onAction}
                    onToggleReschedule={() =>
                        setShowReschedule((visible) => !visible)
                    }
                />
            </div>
            {showReschedule && request.status === "New" && (
                <RequestRescheduleForm
                    date={newDate}
                    time={newTime}
                    onDateChange={setNewDate}
                    onTimeChange={setNewTime}
                    onConfirm={confirmReschedule}
                />
            )}
        </article>
    );
}
