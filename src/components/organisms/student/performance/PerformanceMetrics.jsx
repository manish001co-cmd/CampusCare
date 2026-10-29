import StatCard from "../../../molecules/StatCard";

export default function PerformanceMetrics({ performance }) {
    return (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
                title="Current CGPA"
                value={
                    performance.cgpa == null
                        ? "Not recorded"
                        : `${performance.cgpa} / 10`
                }
                subtitle={performance.gpaGrowth || ""}
            />
            <StatCard
                title="Overall Attendance"
                value={
                    performance.attendance == null
                        ? "Not recorded"
                        : `${performance.attendance}%`
                }
                subtitle={performance.attendanceStatus || ""}
            />
            <StatCard
                title="Counselling Sessions"
                value={`${performance.totalSessionsCompleted ?? 0} Sessions`}
                subtitle=""
            />
        </div>
    );
}
