export default function TaskFeedbackField({ value, onChange }) {
    return (
        <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Feedback / Instructions
            </label>
            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Add guidance or context for this task..."
                rows={2}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
}
