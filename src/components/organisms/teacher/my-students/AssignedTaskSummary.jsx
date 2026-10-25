export default function AssignedTaskSummary({ student }) {
    return (
        <div className="hidden min-w-45 text-right lg:block">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Assigned Task
            </p>
            <p className="text-[11px] font-medium text-slate-700">
                {student.assignedTask}
            </p>
            <p className="text-[10px] text-slate-500">Due: {student.taskDue}</p>
        </div>
    );
}
