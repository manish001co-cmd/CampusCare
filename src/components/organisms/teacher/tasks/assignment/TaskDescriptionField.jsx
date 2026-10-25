export default function TaskDescriptionField({ value, onChange }) {
    return (
        <div>
            <label htmlFor="teacher-task-description" className="mb-1 block text-[11px] font-semibold text-slate-600">
                Task Description
            </label>
            <input
                id="teacher-task-description"
                type="text"
                required
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="e.g. Submit attendance explanation letter"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
}
