export default function TaskAssignmentActions({ onClose }) {
    return (
        <div className="flex gap-3 pt-1">
            <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="flex-1 rounded-xl bg-[#0f3460] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1a4a7a]"
            >
                Assign Task
            </button>
        </div>
    );
}
