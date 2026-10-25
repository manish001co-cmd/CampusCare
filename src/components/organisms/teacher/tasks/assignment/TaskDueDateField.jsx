export default function TaskDueDateField({ value, onChange }) {
    return (
        <div>
            <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                Due Date
            </label>
            <input
                type="date"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
}
