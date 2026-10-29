import TeacherGreeting from "./TeacherGreeting";
import MentoringDashboardBanner from "./MentoringDashboardBanner";
import TeacherOverviewStats from "./TeacherOverviewStats";
import EarlyWarningPanel from "./EarlyWarningPanel";
import AppointmentInboxPanel from "./AppointmentInboxPanel";

export default function TeacherOverview({
    teacher,
    stats,
    students,
    requests,
    onNavigate,
}) {
    const atRiskStudents = students.filter(
        (student) =>
            Number.isFinite(student.attendance) && student.attendance < 75
    );
    const newRequests = requests.filter((request) => request.status === "New");

    return (
        <main className="p-8 max-w-6xl">
            <TeacherGreeting teacher={teacher} />
            <MentoringDashboardBanner
                stats={stats}
                newRequestCount={newRequests.length}
                onReviewRequests={() => onNavigate("Appointments")}
            />
            <TeacherOverviewStats stats={stats} onNavigate={onNavigate} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <EarlyWarningPanel students={atRiskStudents} />
                <AppointmentInboxPanel
                    requests={requests}
                    onViewAll={() => onNavigate("Appointments")}
                />
            </div>
        </main>
    );
}
