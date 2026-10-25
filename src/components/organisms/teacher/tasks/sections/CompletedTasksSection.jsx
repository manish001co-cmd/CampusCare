import TeacherTaskRow from "./TeacherTaskRow";

export default function CompletedTasksSection({ tasks, onMarkDone }) {
    if (tasks.length === 0) return null;

    return (
        <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                Completed ({tasks.length})
            </h2>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <TeacherTaskRow
                        key={task.id}
                        task={task}
                        onMarkDone={onMarkDone}
                        done
                    />
                ))}
            </div>
        </section>
    );
}
