import { Lock } from "lucide-react";

const typeMeta = {
    academic: {
        label: "Academic",
        color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    career: {
        label: "Career",
        color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    personal: {
        label: "Personal 🔒",
        color: "bg-rose-50 text-rose-700 border-rose-200",
        confidential: true,
    },
};

const statusColors = {
    New: "bg-blue-100 text-blue-800",
    Accepted: "bg-emerald-100 text-emerald-800",
    Rejected: "bg-slate-100 text-slate-600",
};

export default function RequestSummary({ request }) {
    const meta = typeMeta[request.type] || typeMeta.academic;

    return (
        <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
                <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${meta.color}`}
                >
                    {meta.label}
                </span>
                {meta.confidential && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                        <Lock size={9} />
                        Confidential · Visible only to Counsellor
                    </span>
                )}
                <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        statusColors[request.status] ||
                        "bg-amber-100 text-amber-800"
                    }`}
                >
                    {request.status}
                </span>
            </div>
            <p className="text-sm font-bold text-slate-900">{request.title}</p>
            <p className="mt-0.5 text-[11px] text-slate-600">
                Student: <strong>{request.studentName}</strong> (
                {request.studentId}) · {request.date} at {request.time}
            </p>
            {request.type === "personal" ? (
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
                    <Lock size={11} />
                    <span>
                        <strong>Session notes are confidential.</strong> Access
                        restricted to assigned counsellor only.
                    </span>
                </div>
            ) : (
                <p className="mt-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
                    {request.notes}
                </p>
            )}
        </div>
    );
}
