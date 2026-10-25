export default function RequestRescheduleForm({
    date,
    time,
    onDateChange,
    onTimeChange,
    onConfirm,
}) {
    return (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-3 text-[11px] font-bold text-amber-800">
                Propose New Time
            </p>
            <div className="flex flex-wrap gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-slate-600">
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(event) => onDateChange(event.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-slate-600">
                        Time
                    </label>
                    <input
                        type="text"
                        value={time}
                        onChange={(event) => onTimeChange(event.target.value)}
                        placeholder="e.g. 11:00 AM"
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>
                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-xl bg-amber-600 px-4 py-1.5 text-[11px] font-bold text-white transition hover:bg-amber-700"
                    >
                        Confirm Reschedule
                    </button>
                </div>
            </div>
        </div>
    );
}
