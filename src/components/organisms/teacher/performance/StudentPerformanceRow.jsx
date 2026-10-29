export default function StudentPerformanceRow({ student }) {
    const attendanceColor =
        student.attendance != null && student.attendance < 75
            ? "text-rose-600"
            : student.attendance != null && student.attendance < 80
              ? "text-amber-600"
              : "text-emerald-600";
    const statusColor =
        student.performanceStatus === "High Priority"
            ? "bg-rose-50 text-rose-700"
            : student.performanceStatus === "Needs Support"
              ? "bg-amber-50 text-amber-700"
              : student.performanceStatus === "Improving"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-50 text-slate-600";

    return (
        <tr className={student.attendance != null && student.attendance < 75 ? "bg-rose-50/50" : ""}>
            <td className="py-2.5 font-medium text-slate-800">
                {student.fullName}
            </td>
            <td className="py-2.5 text-slate-700">{student.gpa == null ? "Not recorded" : `${student.gpa} / 10`}</td>
            <td className={`py-2.5 font-bold ${attendanceColor}`}>
                {student.attendance == null ? "Not recorded" : `${student.attendance}%`}
            </td>
            <td className="py-2.5">
                <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColor}`}
                >
                    {student.performanceStatus}
                </span>
            </td>
        </tr>
    );
}
