import { useState } from "react";
import TaskManagementHeader from "./TaskManagementHeader";
import TaskAssignmentForm from "./assignment/TaskAssignmentForm";
import PendingTasksSection from "./sections/PendingTasksSection";
import CompletedTasksSection from "./sections/CompletedTasksSection";

export default function TeacherTasksView({
    tasks,
    students,
    onAddTask,
    onMarkDone,
}) {
    const [showForm, setShowForm] = useState(false);

    const pendingTasks = tasks.filter((task) => task.status === "Pending");
    const completedTasks = tasks.filter((task) => task.status === "Completed");

    return (
        <main className="p-8 max-w-5xl">
            <TaskManagementHeader
                pendingCount={pendingTasks.length}
                completedCount={completedTasks.length}
                onToggleForm={() => setShowForm((visible) => !visible)}
            />
            {showForm && (
                <TaskAssignmentForm
                    students={students}
                    onAddTask={onAddTask}
                    onClose={() => setShowForm(false)}
                />
            )}
            <PendingTasksSection tasks={pendingTasks} onMarkDone={onMarkDone} />
            <CompletedTasksSection tasks={completedTasks} onMarkDone={onMarkDone} />
        </main>
    );
}
