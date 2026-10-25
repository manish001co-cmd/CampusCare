export default function StudentPerformanceStats({ student }) {
    const attendanceColor =
        student.attendance < 75
            ? "text-rose-600"
            : student.attendance < 80
              ? "text-amber-600"
              : "text-emerald-600";
    const statusColor =
        student.performanceStatus === "High Priority"
            ? "text-rose-600"
            : student.performanceStatus === "Needs Support"
              ? "text-amber-600"
              : student.performanceStatus === "Improving"
                ? "text-emerald-600"
                : "text-slate-700";

    return (
        <div className="flex items-center gap-6 text-center">
            <div>
                <p className="text-xs font-bold text-slate-900">{student.gpa}</p>
                <p className="text-[10px] text-slate-500">CGPA</p>
            </div>
            <div>
                <p className={`text-xs font-bold ${attendanceColor}`}>
                    {student.attendance}%
                </p>
                <p className="text-[10px] text-slate-500">Attendance</p>
            </div>
            <div>
                <p className={`text-[11px] font-bold ${statusColor}`}>
                    {student.performanceStatus}
                </p>
                <p className="text-[10px] text-slate-500">Status</p>
            </div>
        </div>
    );
}
