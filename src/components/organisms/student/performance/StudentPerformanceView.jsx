import PerformanceHeader from "./PerformanceHeader";
import PerformanceMetrics from "./PerformanceMetrics";
import GpaTrendChart from "./GpaTrendChart";
import SessionHistorySection from "./SessionHistorySection";

export default function StudentPerformanceView({ performance }) {
    const data = performance || {};

    return (
        <main className="p-8 max-w-5xl">
            <PerformanceHeader />
            <PerformanceMetrics performance={data} />
            <GpaTrendChart semesterTrend={data.semesterTrend} />
            <SessionHistorySection history={data.recentHistory || []} />
        </main>
    );
}
