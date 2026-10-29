import PerformanceStatCard from "./PerformanceStatCard";

export default function ClassPerformanceStats({ students, stats }) {
    const recordedGpa = students
        .map((student) => student.gpa)
        .filter(Number.isFinite);
    const recordedAttendance = students
        .map((student) => student.attendance)
        .filter(Number.isFinite);
    const averageCgpa = recordedGpa.length
        ? (
              recordedGpa.reduce((total, value) => total + value, 0) /
              recordedGpa.length
          ).toFixed(1)
        : "Not recorded";
    const averageAttendance = recordedAttendance.length
        ? Math.round(
              recordedAttendance.reduce((total, value) => total + value, 0) /
                  recordedAttendance.length
          )
        : null;
    const atRiskCount = students.filter(
        (student) =>         Number.isFinite(student.attendance) && student.attendance < 75
    ).length;

    const cards = [
        {
            label: "Assigned Students",
            value: stats.assignedStudentsCount,
            sub: "Total mentees",
        },
        { label: "Avg Class CGPA", value: averageCgpa, sub: "Out of 10" },
        {
            label: "Avg Attendance",
            value:
                averageAttendance == null
                    ? "Not recorded"
                    : `${averageAttendance}%`,
            sub: "Class average",
        },
        {
            label: "At-Risk Students",
            value: atRiskCount,
            sub: "Below 75% attendance",
            alert: atRiskCount > 0,
        },
    ];

    return (
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {cards.map((card) => (
                <PerformanceStatCard key={card.label} {...card} />
            ))}
        </div>
    );
}
