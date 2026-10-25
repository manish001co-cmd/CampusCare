import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { studentRoleData } from "../data/roles/Students";
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

export default function StudentDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const section = location.pathname.split("/").filter(Boolean)[2];
    const activeTab =
        Object.entries(studentSections).find(([, slug]) => slug === section)?.[0] ||
        "Home";
    const setActiveTab = (tab) =>
        navigate(`/dashboard/student/${studentSections[tab]}`);
    const [statusFilter, setStatusFilter] = useState("All");
    const [performance, setPerformance] = useState(studentRoleData.performance);
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
        if (!token) return;

        fetch("/api/student/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) return;
                if (data.profile) {
                    setProfile((current) => ({
                        ...current,
                        ...data.profile,
                        mentor: data.profile.mentor || current.mentor,
                        mentorRole: "Assigned Faculty Mentor · CSE",
                        mentorOffice: current.mentorOffice || "Room 2B",
                    }));
                    setProfileEdit((current) => ({
                        ...current,
                        ...data.profile,
                        mentor: data.profile.mentor || current.mentor,
                        mentorRole: "Assigned Faculty Mentor · CSE",
                        mentorOffice: current.mentorOffice || "Room 2B",
                    }));
                }
                if (data.appointments?.length) {
                    setAppointments(data.appointments);
                }
                if (data.tasks?.length) setTasks(data.tasks);
                if (data.performance) setPerformance(data.performance);
            })
            .catch((error) => {
                console.log(
                    "Using centralized Students.jsx state:",
                    error.message
                );
            });
    }, [setAppointments, setProfile, setProfileEdit, setTasks]);

    const handleLogout = () => {
        localStorage.removeItem("campuscare_token");
        localStorage.removeItem("campuscare_user");
        navigate("/", { replace: true });
    };

    const nextAppointment =
        appointments.find((appointment) => appointment.status === "Accepted") ||
        appointments[0];

    return (
        <DashboardLayout
            sidebar={
                <StudentSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    mentor={{
                        name: profile.mentor,
                        role: profile.mentorRole,
                        office: profile.mentorOffice || "Room 2B",
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
