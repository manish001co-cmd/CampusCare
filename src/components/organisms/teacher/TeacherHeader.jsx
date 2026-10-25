import DashboardBreadcrumb from "../shared/DashboardBreadcrumb";
import NotificationMenu from "../shared/NotificationMenu";
import TeacherProfileMenu from "./TeacherProfileMenu";

export default function TeacherHeader({
    activeTab,
    teacher,
    onLogout,
    notifications = [],
}) {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#d6e4f5] bg-[#f5f9ff]/90 px-8 backdrop-blur-md">
            <DashboardBreadcrumb section={activeTab} />
            <div className="flex items-center gap-3">
                <NotificationMenu notifications={notifications} accent="blue" />
                <TeacherProfileMenu teacher={teacher} onLogout={onLogout} />
            </div>
        </header>
    );
}
