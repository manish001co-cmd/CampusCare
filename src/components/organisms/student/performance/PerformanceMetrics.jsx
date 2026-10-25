import StatCard from "../../../molecules/StatCard";

export default function PerformanceMetrics({ performance }) {
    return (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
                title="Current CGPA"
                value={`${performance.cgpa || 8.6} / 10`}
                subtitle={performance.gpaGrowth || "+0.2 from last semester"}
            />
            <StatCard
                title="Overall Attendance"
                value={`${performance.attendance || 92}%`}
                subtitle={
                    performance.attendanceStatus || "Above 85% requirement"
                }
            />
            <StatCard
                title="Counselling Sessions"
                value={`${performance.totalSessionsCompleted || 3} Sessions`}
                subtitle="1 upcoming scheduled"
            />
        </div>
    );
}
