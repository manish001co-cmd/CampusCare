import { X } from "lucide-react";

export default function TaskAssignmentModalHeader({ onClose }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2
                id="assign-task-modal-title"
                className="text-sm font-bold text-slate-900"
            >
                Assign Task to Student
            </h2>
            <button
                type="button"
                onClick={onClose}
                aria-label="Close task assignment"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100"
            >
                <X size={16} />
            </button>
        </div>
    );
}
