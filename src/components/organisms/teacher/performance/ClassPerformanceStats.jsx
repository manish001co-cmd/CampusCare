import PerformanceStatCard from "./PerformanceStatCard";

export default function ClassPerformanceStats({ students, stats }) {
    const averageCgpa = (
        students.reduce((total, student) => total + student.gpa, 0) /
        students.length
    ).toFixed(1);
    const averageAttendance = Math.round(
        students.reduce((total, student) => total + student.attendance, 0) /
            students.length
    );
    const atRiskCount = students.filter(
        (student) => student.attendance < 75
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
            value: `${averageAttendance}%`,
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
