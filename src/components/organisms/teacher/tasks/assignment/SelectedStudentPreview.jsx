import Avatar from "../../../../atoms/Avatar";

export default function SelectedStudentPreview({ student }) {
    const atRisk = student.attendance < 75;

    return (
        <div
            className={`mt-2 flex items-center gap-2 rounded-xl border px-3 py-2 ${
                atRisk
                    ? "border-rose-200 bg-rose-50"
                    : "border-slate-100 bg-slate-50"
            }`}
        >
            <Avatar name={student.fullName} size="sm" />
            <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-800">
                    {student.fullName}
                </p>
                <p className="text-[10px] text-slate-500">
                    Attendance:{" "}
                    <span
                        className={
                            atRisk
                                ? "font-bold text-rose-600"
                                : "text-slate-600"
                        }
                    >
                        {student.attendance}%
                    </span>{" "}
                    · CGPA: {student.gpa}
                </p>
            </div>
        </div>
    );
}
