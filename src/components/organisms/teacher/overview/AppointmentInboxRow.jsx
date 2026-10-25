export default function AppointmentInboxRow({ request }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <div>
                <p className="text-xs font-bold text-slate-800">
                    {request.studentName}
                </p>
                <p className="text-[10px] text-slate-500">
                    {request.type} · {request.date} at {request.time}
                </p>
            </div>
            <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    request.status === "New"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                }`}
            >
                {request.status}
            </span>
        </div>
    );
}
