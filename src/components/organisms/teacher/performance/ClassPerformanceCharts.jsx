import AttendanceChart from "./AttendanceChart";
import ClassHealthChart from "./ClassHealthChart";

export default function ClassPerformanceCharts({ students }) {
    const performanceData = students.map((student) => ({
        name: student.fullName.split(" ")[0],
        CGPA: student.gpa,
        Attendance: student.attendance,
        fill:
            student.attendance < 75
                ? "#ef4444"
                : student.attendance < 80
                  ? "#f59e0b"
                  : "#22c55e",
    }));
    const radarData = [
        {
            category: "CGPA",
            value: Math.round(
                (students.reduce((total, student) => total + student.gpa, 0) /
                    students.length) *
                    10
            ),
        },
        {
            category: "Attendance",
            value: Math.round(
                students.reduce(
                    (total, student) => total + student.attendance,
                    0
                ) / students.length
            ),
        },
        { category: "Task Completion", value: 72 },
        { category: "Session Rate", value: 85 },
        { category: "Engagement", value: 78 },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AttendanceChart data={performanceData} />
            <ClassHealthChart data={radarData} />
        </div>
    );
}
