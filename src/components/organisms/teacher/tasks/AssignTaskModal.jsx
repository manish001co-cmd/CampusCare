import { useState } from "react";
import TaskAssignmentModalHeader from "./assignment/TaskAssignmentModalHeader";
import AssignedStudentSelector from "./assignment/AssignedStudentSelector";
import TaskDescriptionField from "./assignment/TaskDescriptionField";
import TaskDeadlinePriorityFields from "./assignment/TaskDeadlinePriorityFields";
import TaskFeedbackField from "./assignment/TaskFeedbackField";
import TaskAssignmentFeedback from "./assignment/TaskAssignmentFeedback";
import TaskAssignmentActions from "./assignment/TaskAssignmentActions";

export default function AssignTaskModal({
    isOpen,
    onClose,
    student,
    students,
    onAssign,
}) {
    const [form, setForm] = useState({
        studentId: student?.id || students[0]?.id || "",
        studentName: student?.fullName || students[0]?.fullName || "",
        task: "",
        dueDate: "",
        priority: "Medium",
        feedback: "",
    });
    const [successMsg, setSuccessMsg] = useState("");

    if (!isOpen) return null;

    const updateField = (field, value) =>
        setForm((current) => ({ ...current, [field]: value }));

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.task.trim()) return;
        onAssign({
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
            feedback: form.feedback || "Task assigned. Check back for updates.",
            priority: form.priority,
        });
        setSuccessMsg(`Task assigned to ${form.studentName}!`);
        setTimeout(() => {
            setSuccessMsg("");
            onClose();
            setForm((current) => ({
                ...current,
                task: "",
                dueDate: "",
                feedback: "",
            }));
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="assign-task-modal-title"
                className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
                <TaskAssignmentModalHeader onClose={onClose} />
                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <AssignedStudentSelector
                        students={students}
                        selectedStudentId={form.studentId}
                        onSelect={(selected) => {
                            setForm((current) => ({
                                ...current,
                                studentId: selected.id,
                                studentName: selected.fullName,
                            }));
                        }}
                    />
                    <TaskDescriptionField
                        value={form.task}
                        onChange={(value) => updateField("task", value)}
                        required
                    />
                    <TaskDeadlinePriorityFields
                        dueDate={form.dueDate}
                        priority={form.priority}
                        onDueDateChange={(value) => updateField("dueDate", value)}
                        onPriorityChange={(value) =>
                            updateField("priority", value)
                        }
                    />
                    <TaskFeedbackField
                        value={form.feedback}
                        onChange={(value) => updateField("feedback", value)}
                    />
                    <TaskAssignmentFeedback message={successMsg} />
                    <TaskAssignmentActions onClose={onClose} />
                </form>
            </section>
        </div>
    );
}
