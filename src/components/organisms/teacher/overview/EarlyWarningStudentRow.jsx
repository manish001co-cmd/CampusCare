export default function EarlyWarningStudentRow({ student }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5">
            <div>
                <p className="text-xs font-bold text-slate-800">
                    {student.fullName}
                </p>
                <p className="text-[10px] text-slate-500">
                    {student.identifier} · {student.program}
                </p>
            </div>
            <div className="text-right">
                <p className="text-sm font-extrabold text-rose-600">
                    {student.attendance}%
                </p>
                <p className="text-[10px] text-rose-500">Attendance</p>
            </div>
        </div>
    );
}
