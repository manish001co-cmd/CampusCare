import { CheckCircle2 } from "lucide-react";

export default function TeacherTaskRow({ task, onMarkDone, done = false }) {
    return (
        <article
            className={`flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm ${
                done ? "border-slate-100 opacity-70" : "border-slate-200"
            }`}
        >
            <button
                type="button"
                onClick={() => !done && onMarkDone(task.id)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition ${
                    done
                        ? "border-emerald-400 bg-emerald-50 text-emerald-600"
                        : "border-slate-300 text-slate-400 hover:border-blue-400 hover:bg-blue-50"
                }`}
                aria-label={done ? "Completed" : "Mark complete"}
            >
                <CheckCircle2 size={16} />
            </button>
            <div className="min-w-0 flex-1">
                <p
                    className={`text-xs font-bold ${
                        done ? "text-slate-400 line-through" : "text-slate-800"
                    }`}
                >
                    {task.task}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                    Student: <strong>{task.studentName}</strong> · Assigned:{" "}
                    {task.assignedDate} · Due: {task.dueDate}
                </p>
                <p className="mt-0.5 text-[10px] italic text-slate-400">
                    {task.feedback}
                </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
                {task.priority && (
                    <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                            task.priority === "High"
                                ? "border-rose-200 bg-rose-50 text-rose-700"
                                : task.priority === "Medium"
                                  ? "border-amber-200 bg-amber-50 text-amber-700"
                                  : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                    >
                        {task.priority}
                    </span>
                )}
                <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        done
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                    }`}
                >
                    {task.status}
                </span>
            </div>
        </article>
    );
}
