import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/templates/DashboardLayout";
import StudentSidebar from "../components/organisms/student/StudentSidebar";
import StudentHeader from "../components/organisms/student/StudentHeader";
import StudentDashboardSections from "../components/organisms/student/sections/StudentDashboardSections";
import useStudentProfile from "../hooks/student/useStudentProfile";
import useStudentTasks from "../hooks/student/useStudentTasks";
import useStudentAppointments from "../hooks/student/useStudentAppointments";

const studentSections = {
    Home: "home",
    "My profile": "my-profile",
    Appointments: "appointments",
    "My tasks": "my-tasks",
    "Performance & History": "performance-history",
};

function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("campuscare_user") || "null");
    } catch {
        return null;
    }
}

export default function StudentDashboard() {
    const storedUser = getStoredUser();
    if (
        !storedUser ||
        storedUser.role !== "student" ||
        !localStorage.getItem("campuscare_token")
    ) {
        return <Navigate to="/" replace />;
    }

    return <StudentDashboardContent />;
}

function StudentDashboardContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const section = location.pathname.split("/").filter(Boolean)[2];
    const activeTab =
        Object.entries(studentSections).find(([, slug]) => slug === section)?.[0] ||
        "Home";
    const setActiveTab = (tab) =>
        navigate(`/dashboard/student/${studentSections[tab]}`);
    const [statusFilter, setStatusFilter] = useState("All");
    const [performance, setPerformance] = useState(null);
    const [counsellors, setCounsellors] = useState([]);
    const [isLoading, setIsLoading] = useState(
        () => Boolean(localStorage.getItem("campuscare_token"))
    );
    const [dashboardError, setDashboardError] = useState(() =>
        localStorage.getItem("campuscare_token")
            ? ""
            : "Your session has expired. Please sign in again."
    );
    const [reloadKey, setReloadKey] = useState(0);
    const profileState = useStudentProfile();
    const taskState = useStudentTasks();
    const appointmentState = useStudentAppointments(
        profileState.profile.mentor
    );
    const {
        profile,
        setProfile,
        profileEdit,
        setProfileEdit,
        profileSaveMsg,
        handleSaveProfile,
    } = profileState;
    const { tasks, setTasks, handleToggleTask } = taskState;
    const {
        appointments,
        setAppointments,
        isBookingOpen,
        setIsBookingOpen,
        bookingSuccessMsg,
        bookingForm,
        setBookingForm,
        handleBookingSubmit,
        openBookingForMentor,
    } = appointmentState;

    useEffect(() => {
        if (
            section &&
            section !== "student" &&
            !Object.values(studentSections).includes(section)
        ) {
            navigate("/dashboard/student/home", { replace: true });
        }
    }, [location.pathname, navigate, section]);

    useEffect(() => {
        const token = localStorage.getItem("campuscare_token");
        if (!token) return undefined;

        let isCurrent = true;
        const loadDashboard = async () => {
            setIsLoading(true);
            setDashboardError("");
            try {
                const response = await fetch("/api/student/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const body = await response.text();
                let data;
                try {
                    data = JSON.parse(body);
                } catch {
                    throw new Error(
                        `The student API returned an invalid response (HTTP ${response.status}). Restart the backend and try again.`
                    );
                }
                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message || "Unable to load student dashboard."
                    );
                }
                if (!isCurrent) return;

                setProfile(data.profile);
                setProfileEdit(data.profile);
                setAppointments(data.appointments || []);
                setTasks(data.tasks || []);
                setPerformance(data.performance || null);
                setCounsellors(data.counsellors || []);
                setBookingForm((current) => ({
                    ...current,
                    counsellorName:
                        data.profile.mentor ||
                        data.counsellors?.[0]?.fullName ||
                        "",
                }));
            } catch (requestError) {
                if (isCurrent) {
                    setDashboardError(
                        requestError instanceof Error
                            ? requestError.message
                            : "Unable to load student dashboard."
                    );
                }
            } finally {
                if (isCurrent) setIsLoading(false);
            }
        };
        loadDashboard();
        return () => {
            isCurrent = false;
        };
    }, [
        reloadKey,
        setAppointments,
        setProfile,
        setProfileEdit,
        setTasks,
        setBookingForm,
    ]);

    useEffect(() => {
        if (!profile.mentor) return;
        setBookingForm((current) => ({
            ...current,
            counsellorName: profile.mentor,
        }));
    }, [profile.mentor, setBookingForm]);

    const handleLogout = () => {
        localStorage.removeItem("campuscare_token");
        localStorage.removeItem("campuscare_user");
        navigate("/", { replace: true });
    };

    const nextAppointment = appointments
        .filter(
            (appointment) =>
                ["Pending", "Accepted"].includes(appointment.status) &&
                (!appointment.date ||
                    new Date(`${appointment.date}T23:59:59`) >= new Date())
        )
        .sort(
            (first, second) =>
                new Date(first.date) - new Date(second.date)
        )[0];
    const recentActivities = useMemo(
        () =>
            [
                ...appointments.map((appointment) => ({
                    id: `appointment-${appointment._id}`,
                    kind: "appointment",
                    createdAt: appointment.createdAt,
                    text: `${appointment.title} · ${appointment.status}`,
                })),
                ...tasks.map((task) => ({
                    id: `task-${task._id}`,
                    kind: "task",
                    createdAt: task.updatedAt || task.createdAt,
                    text: `${task.title} · ${task.completed ? "Completed" : "Pending"}`,
                })),
            ]
                .sort(
                    (first, second) =>
                        new Date(second.createdAt || 0) -
                        new Date(first.createdAt || 0)
                )
                .slice(0, 5)
                .map((activity) => ({
                    ...activity,
                    text: activity.createdAt
                        ? `${activity.text} · ${new Date(activity.createdAt).toLocaleString()}`
                        : activity.text,
                })),
        [appointments, tasks]
    );

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
                Loading student data…
            </main>
        );
    }

    return (
        <DashboardLayout
            sidebar={
                <StudentSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    mentor={{
                        name: profile.mentor,
                        role: profile.mentorRole,
                        office: profile.mentorOffice,
                    }}
                    onBookClick={openBookingForMentor}
                />
            }
            header={
                <StudentHeader
                    activeTab={activeTab}
                    student={{
                        fullName: profile.fullName,
                        identifier: profile.identifier,
                    }}
                    notifications={[
                        ...appointments.map((appointment) => ({
                            id: `appointment-${appointment._id}`,
                            type: "appointment",
                            title: `Appointment ${appointment.status}`,
                            body: `${appointment.title} with ${appointment.counsellorName}`,
                            time: appointment.date,
                            read: false,
                        })),
                        ...tasks.map((task) => ({
                            id: `task-${task._id}`,
                            type: "task",
                            title: task.completed
                                ? "Task completed"
                                : "Task assigned",
                            body: task.title,
                            time: task.dueDate,
                            read: false,
                        })),
                    ].slice(0, 10)}
                    onLogout={handleLogout}
                />
            }
        >
            <StudentDashboardSections
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                profile={profile}
                profileEdit={profileEdit}
                setProfileEdit={setProfileEdit}
                onSaveProfile={handleSaveProfile}
                profileSaveMsg={profileSaveMsg}
                appointments={appointments}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                tasks={tasks}
                onToggleTask={handleToggleTask}
                performance={performance}
                nextAppointment={nextAppointment}
                recentActivities={recentActivities}
                counsellors={counsellors}
                dashboardError={
                    dashboardError ||
                    profileState.error ||
                    taskState.error ||
                    appointmentState.error
                }
                onRetry={() => setReloadKey((current) => current + 1)}
                isBookingOpen={isBookingOpen}
                onOpenBooking={() => setIsBookingOpen(true)}
                onCloseBooking={() => setIsBookingOpen(false)}
                bookingForm={bookingForm}
                setBookingForm={setBookingForm}
                onBookingSubmit={handleBookingSubmit}
                bookingSuccessMsg={bookingSuccessMsg}
            />
        </DashboardLayout>
    );
}
