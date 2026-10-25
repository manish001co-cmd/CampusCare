import StudentTasksHeader from "./StudentTasksHeader";
import TaskCompletionProgress from "./TaskCompletionProgress";
import StudentTaskList from "./StudentTaskList";

export default function StudentTasksView({ tasks = [], onToggleTask }) {
    const completedCount = tasks.filter((task) => task.completed).length;
    const progressPercent = Math.round(
        (completedCount / (tasks.length || 1)) * 100
    );

    return (
        <main className="p-8 max-w-4xl">
            <StudentTasksHeader />
            <TaskCompletionProgress progressPercent={progressPercent} />
            <StudentTaskList tasks={tasks} onToggleTask={onToggleTask} />
        </main>
    );
}
