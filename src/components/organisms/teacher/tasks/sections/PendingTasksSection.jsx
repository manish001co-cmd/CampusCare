import TeacherTaskRow from "./TeacherTaskRow";

export default function PendingTasksSection({ tasks, onMarkDone }) {
    if (tasks.length === 0) return null;

    return (
        <section className="mb-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                Pending ({tasks.length})
            </h2>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <TeacherTaskRow
                        key={task.id}
                        task={task}
                        onMarkDone={onMarkDone}
                    />
                ))}
            </div>
        </section>
    );
}
