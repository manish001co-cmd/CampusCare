import { AlertTriangle } from "lucide-react";

export default function AttendanceWarningBanner({ students }) {
    if (students.length === 0) return null;

    return (
        <section className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-rose-600" />
            <div>
                <h2 className="text-sm font-bold text-rose-800">
                    {students.length} Student{students.length > 1 ? "s" : ""} Below
                    Attendance Threshold (75%)
                </h2>
                <p className="mt-1 text-[11px] text-rose-700">
                    {students
                        .map(
                            (student) =>
                                `${student.fullName} (${student.attendance}%)`
                        )
                        .join(" · ")}{" "}
                    — Immediate counselling sessions recommended.
                </p>
            </div>
        </section>
    );
}
