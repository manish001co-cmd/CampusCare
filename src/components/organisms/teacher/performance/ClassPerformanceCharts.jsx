import AttendanceChart from "./AttendanceChart";
import ClassHealthChart from "./ClassHealthChart";

export default function ClassPerformanceCharts({
    students,
    tasks,
    requests,
}) {
    const recordedGpa = students
        .map((student) => student.gpa)
        .filter(Number.isFinite);
    const recordedAttendance = students
        .map((student) => student.attendance)
        .filter(Number.isFinite);
    const engagedStudents = new Set([
        ...tasks.map((task) => task.studentName),
        ...requests.map((request) => request.studentName),
    ]);
    const average = (values) =>
        values.length
            ? values.reduce((total, value) => total + value, 0) / values.length
            : 0;
    const performanceData = students.map((student) => ({
        name: student.fullName.split(" ")[0],
        CGPA: student.gpa,
        Attendance: student.attendance,
        fill:
            student.attendance != null && student.attendance < 75
                ? "#ef4444"
                : student.attendance != null && student.attendance < 80
                  ? "#f59e0b"
                  : "#22c55e",
    }));
    const radarData = [
        {
            category: "CGPA",
            value: Math.round(average(recordedGpa) * 10),
        },
        {
            category: "Attendance",
            value: Math.round(average(recordedAttendance)),
        },
        {
            category: "Task Completion",
            value: tasks.length
                ? Math.round(
                      (tasks.filter((task) => task.status === "Completed")
                          .length /
                          tasks.length) *
                          100
                  )
                : 0,
        },
        {
            category: "Session Rate",
            value: requests.length
                ? Math.round(
                      (requests.filter((request) =>
                          ["Accepted", "Completed"].includes(request.status)
                      ).length /
                          requests.length) *
                          100
                  )
                : 0,
        },
        {
            category: "Engagement",
            value: students.length
                ? Math.round(
                      (engagedStudents.size / students.length) * 100
                  )
                : 0,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AttendanceChart data={performanceData} />
            <ClassHealthChart data={radarData} />
        </div>
    );
}
