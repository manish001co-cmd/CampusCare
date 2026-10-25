export default function TaskPriorityField({ value, onChange }) {
    return (
        <div>
            <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                Priority
            </label>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
        </div>
    );
}
