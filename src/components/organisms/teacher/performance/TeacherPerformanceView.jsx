import ClassPerformanceHeader from "./ClassPerformanceHeader";
import AttendanceWarningBanner from "./AttendanceWarningBanner";
import ClassPerformanceStats from "./ClassPerformanceStats";
import ClassPerformanceCharts from "./ClassPerformanceCharts";
import StudentPerformanceTable from "./StudentPerformanceTable";

export default function TeacherPerformanceView({ students, stats }) {
    const atRiskStudents = students.filter((student) => student.attendance < 75);

    return (
        <main className="p-8 max-w-6xl">
            <ClassPerformanceHeader studentCount={students.length} />
            <AttendanceWarningBanner students={atRiskStudents} />
            <ClassPerformanceStats students={students} stats={stats} />
            <ClassPerformanceCharts students={students} />
            <StudentPerformanceTable students={students} />
        </main>
    );
}
