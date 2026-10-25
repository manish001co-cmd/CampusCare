import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import AssignedStudentField from "./AssignedStudentField";
import TaskPriorityField from "./TaskPriorityField";
import TaskDescriptionField from "./TaskDescriptionField";
import TaskDueDateField from "./TaskDueDateField";

export default function TaskAssignmentForm({ students, onAddTask, onClose }) {
    const [form, setForm] = useState({
        studentId: students[0]?.id || "",
        studentName: students[0]?.fullName || "",
        task: "",
        dueDate: "",
        priority: "Medium",
    });
    const [successMsg, setSuccessMsg] = useState("");

    const updateField = (field, value) =>
        setForm((current) => ({ ...current, [field]: value }));

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.task.trim()) return;

        onAddTask({
            id: `tsk-${Date.now()}`,
            studentName: form.studentName,
            task: form.task,
            assignedDate: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            dueDate: form.dueDate || "TBD",
            status: "Pending",
            feedback: "Newly assigned.",
            priority: form.priority,
        });
        setSuccessMsg(`Task assigned to ${form.studentName} successfully!`);
        setForm((current) => ({ ...current, task: "", dueDate: "" }));
        setTimeout(() => {
            setSuccessMsg("");
            onClose();
        }, 2000);
    };

    return (
        <section className="mb-6 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">
                    New Task Assignment
                </h2>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close task assignment form"
                    className="text-slate-400 hover:text-slate-700"
                >
                    <X size={16} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <AssignedStudentField
                        students={students}
                        value={form.studentId}
                        onChange={(student) =>
                            setForm((current) => ({
                                ...current,
                                studentId: student.id,
                                studentName: student.fullName,
                            }))
                        }
                    />
                    <TaskPriorityField
                        value={form.priority}
                        onChange={(value) => updateField("priority", value)}
                    />
                </div>
                <TaskDescriptionField
                    value={form.task}
                    onChange={(value) => updateField("task", value)}
                />
                <TaskDueDateField
                    value={form.dueDate}
                    onChange={(value) => updateField("dueDate", value)}
                />
                {successMsg && (
                    <div
                        role="status"
                        className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700"
                    >
                        <CheckCircle2 size={13} />
                        {successMsg}
                    </div>
                )}
                <button
                    type="submit"
                    className="rounded-xl bg-[#0f3460] px-5 py-2 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#1a4a7a]"
                >
                    Assign Task
                </button>
            </form>
        </section>
    );
}
