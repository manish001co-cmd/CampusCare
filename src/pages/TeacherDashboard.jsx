import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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

function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("campuscare_user") || "null");
    } catch {
        return null;
    }
}

export default function TeacherDashboard() {
    const storedUser = getStoredUser();
    if (
        !storedUser ||
        storedUser.role !== "teacher" ||
        !localStorage.getItem("campuscare_token")
    ) {
        return <Navigate to="/" replace />;
    }

    return <TeacherDashboardContent />;
}

function TeacherDashboardContent() {
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

    if (dashboard.isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
                Loading teacher data…
            </main>
        );
    }

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
            {dashboard.error && (
                <div
                    role="alert"
                    className="mx-8 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                >
                    <span>{dashboard.error}</span>
                    <button
                        type="button"
                        onClick={dashboard.refresh}
                        className="font-semibold underline"
                    >
                        Retry
                    </button>
                </div>
            )}
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
                onAssign={async (task) => {
                    const saved = await dashboard.handleAddTask(task);
                    if (saved) dashboard.closeAssign();
                    return saved;
                }}
                onOpenAssign={dashboard.handleOpenAssign}
            />
        </DashboardLayout>
    );
}
