import Avatar from "../../../atoms/Avatar";
import StudentIdentity from "./StudentIdentity";
import StudentPerformanceStats from "./StudentPerformanceStats";
import AssignedTaskSummary from "./AssignedTaskSummary";
import StudentInterventionNotice from "./StudentInterventionNotice";
import EarlyWarningBadge from "./EarlyWarningBadge";

const EARLY_WARNING_THRESHOLD = 75;

export default function TeacherStudentCard({ student, onAssignTask }) {
    const attendanceStatus =
        student.attendance < EARLY_WARNING_THRESHOLD
            ? "critical"
            : student.attendance < 80
              ? "risk"
              : "good";

    return (
        <article
            className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
                attendanceStatus === "critical"
                    ? "border-rose-200 bg-rose-50/30"
                    : attendanceStatus === "risk"
                      ? "border-amber-200 bg-amber-50/20"
                      : "border-slate-200"
            }`}
        >
            <div className="flex flex-wrap items-center gap-4">
                <Avatar name={student.fullName} size="md" />
                <StudentIdentity student={student} />
                <EarlyWarningBadge attendance={student.attendance} />
                <StudentPerformanceStats student={student} />
                <AssignedTaskSummary student={student} />
                <button
                    type="button"
                    onClick={() => onAssignTask(student)}
                    className="shrink-0 rounded-xl bg-[#0f3460] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#1a4a7a]"
                >
                    Assign Task
                </button>
            </div>
            {attendanceStatus === "critical" && <StudentInterventionNotice />}
        </article>
    );
}
