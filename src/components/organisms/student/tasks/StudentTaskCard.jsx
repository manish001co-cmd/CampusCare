import { CheckCircle2 } from "lucide-react";

export default function StudentTaskCard({ task, onToggleTask }) {
    return (
        <article
            onClick={() => onToggleTask(task._id)}
            className={`flex cursor-pointer items-start justify-between rounded-2xl border p-4 transition ${
                task.completed
                    ? "border-emerald-200 bg-emerald-50/40"
                    : "border-[#e6e2d8] bg-white hover:border-emerald-300"
            }`}
        >
            <div className="flex items-start gap-3">
                <button
                    type="button"
                    aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
                    aria-pressed={task.completed}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                        task.completed
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white"
                    }`}
                >
                    {task.completed && <CheckCircle2 size={14} />}
                </button>
                <div>
                    <p
                        className={`text-sm font-semibold ${
                            task.completed
                                ? "text-slate-400 line-through"
                                : "text-slate-900"
                        }`}
                    >
                        {task.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        Assigned by <strong>{task.assignedBy}</strong> · Category:{" "}
                        {task.category}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    Due {task.dueDate}
                </span>
            </div>
        </article>
    );
}
