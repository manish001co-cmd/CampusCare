import PerformanceHeader from "./PerformanceHeader";
import PerformanceMetrics from "./PerformanceMetrics";
import GpaTrendChart from "./GpaTrendChart";
import SessionHistorySection from "./SessionHistorySection";

const defaultPerformance = {
    cgpa: 8.6,
    attendance: 92,
    totalSessionsCompleted: 3,
    gpaGrowth: "+0.2 from last semester",
    attendanceStatus: "Above 85% requirement",
    semesterTrend: [
        { semester: "Sem 1", gpa: 8.2 },
        { semester: "Sem 2", gpa: 8.4 },
        { semester: "Sem 3", gpa: 8.5 },
        { semester: "Sem 4", gpa: 8.6 },
    ],
    recentHistory: [],
};

export default function StudentPerformanceView({ performance }) {
    const data = performance || defaultPerformance;

    return (
        <main className="p-8 max-w-5xl">
            <PerformanceHeader />
            <PerformanceMetrics performance={data} />
            <GpaTrendChart semesterTrend={data.semesterTrend} />
            <SessionHistorySection history={data.recentHistory || []} />
        </main>
    );
}
