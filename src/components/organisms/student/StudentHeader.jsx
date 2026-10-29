import StudentProfilePill from "../../molecules/StudentProfilePill";
import DashboardBreadcrumb from "../shared/DashboardBreadcrumb";
import NotificationMenu from "../shared/NotificationMenu";

export default function StudentHeader({
    activeTab,
    student,
    onLogout,
    notifications = [],
}) {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#ece8dc] bg-[#faf9f5]/90 px-8 backdrop-blur-md">
            <DashboardBreadcrumb section={activeTab} />
            <div className="flex items-center gap-3">
                <NotificationMenu
                    notifications={notifications}
                    accent="emerald"
                />
                <StudentProfilePill
                    fullName={student?.fullName || "Student"}
                    identifier={student?.identifier || ""}
                    onLogout={onLogout}
                />
            </div>
        </header>
    );
}
