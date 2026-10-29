export default function TaskDeadlinePriorityFields({
    dueDate,
    priority,
    onDueDateChange,
    onPriorityChange,
}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Due Date
                </label>
                <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(event) => onDueDateChange(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Priority
                </label>
                <select
                    value={priority}
                    onChange={(event) => onPriorityChange(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
            </div>
        </div>
    );
}
