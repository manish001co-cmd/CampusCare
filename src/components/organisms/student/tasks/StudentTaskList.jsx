import StudentTaskCard from "./StudentTaskCard";

export default function StudentTaskList({ tasks, onToggleTask }) {
    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <StudentTaskCard
                    key={task._id}
                    task={task}
                    onToggleTask={onToggleTask}
                />
            ))}
        </div>
    );
}
