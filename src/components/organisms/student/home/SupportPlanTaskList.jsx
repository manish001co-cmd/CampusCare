import SupportPlanTask from "./SupportPlanTask";

export default function SupportPlanTaskList({ tasks, onToggleTask }) {
    return (
        <div className="mt-4 space-y-3">
            {tasks.map((task) => (
                <SupportPlanTask
                    key={task._id}
                    task={task}
                    onToggle={() => onToggleTask(task._id)}
                />
            ))}
        </div>
    );
}
