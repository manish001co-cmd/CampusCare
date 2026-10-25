import { CheckCircle2 } from "lucide-react";

export default function SupportPlanTask({ task, onToggle }) {
    return (
        <div
            onClick={onToggle}
            className="group flex cursor-pointer items-start gap-3 rounded-xl p-2 transition hover:bg-slate-50"
        >
            <button
                type="button"
                aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
                aria-pressed={task.completed}
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                    task.completed
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 bg-white group-hover:border-slate-400"
                }`}
            >
                {task.completed && <CheckCircle2 size={12} />}
            </button>
            <div className="min-w-0 flex-1">
                <p
                    className={`text-xs font-medium leading-tight ${
                        task.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-800"
                    }`}
                >
                    {task.title}
                </p>
                <span className="text-[10px] text-slate-400">
                    Due: {task.dueDate} · {task.assignedBy}
                </span>
            </div>
        </div>
    );
}
