import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/templates/DashboardLayout";
import TeacherSidebar from "../components/organisms/teacher/TeacherSidebar";
import TeacherHeader from "../components/organisms/teacher/TeacherHeader";
import TeacherDashboardSections from "../components/organisms/teacher/sections/TeacherDashboardSections";
import useTeacherDashboard from "../hooks/teacher/useTeacherDashboard";

const teacherSections = {
    Overview: "overview",
    "My Students": "my-students",
    Appointments: "appointments",
    Tasks: "tasks",
    Performance: "performance",
    "My Profile": "my-profile",
};

export default function TeacherDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const section = location.pathname.split("/").filter(Boolean)[2];
    const activeTab =
        Object.entries(teacherSections).find(([, slug]) => slug === section)?.[0] ||
        "Overview";
    const setActiveTab = (tab) =>
        navigate(`/dashboard/teacher/${teacherSections[tab]}`);
    const dashboard = useTeacherDashboard();

    useEffect(() => {
        if (
            section &&
            section !== "teacher" &&
            !Object.values(teacherSections).includes(section)
        ) {
            navigate("/dashboard/teacher/overview", { replace: true });
        }
    }, [location.pathname, navigate, section]);

    const handleLogout = () => {
        localStorage.removeItem("campuscare_token");
        localStorage.removeItem("campuscare_user");
        navigate("/", { replace: true });
    };

    return (
        <DashboardLayout
            sidebar={
                <TeacherSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    teacher={dashboard.teacher}
                />
            }
            header={
                <TeacherHeader
                    activeTab={activeTab}
                    teacher={dashboard.teacher}
                    onLogout={handleLogout}
                    notifications={dashboard.notifications}
                />
            }
        >
            <TeacherDashboardSections
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                teacher={dashboard.teacher}
                stats={dashboard.stats}
                students={dashboard.students}
                requests={dashboard.requests}
                onAppointmentAction={dashboard.handleAppointmentAction}
                tasks={dashboard.tasks}
                onAddTask={dashboard.handleAddTask}
                onMarkDone={dashboard.handleMarkDone}
                isAssignOpen={dashboard.isAssignOpen}
                onCloseAssign={dashboard.closeAssign}
                assignTarget={dashboard.assignTarget}
                onAssign={(task) => {
                    dashboard.handleAddTask(task);
                    dashboard.closeAssign();
                }}
                onOpenAssign={dashboard.handleOpenAssign}
            />
        </DashboardLayout>
    );
}
