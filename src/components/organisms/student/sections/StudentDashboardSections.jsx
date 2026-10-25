import GreetingSection from "../home/GreetingSection";
import NeedToTalkSection from "../home/NeedToTalkSection";
import StudentQuickStatsSection from "../home/StudentQuickStatsSection";
import UpcomingAppointmentSection from "../home/UpcomingAppointmentSection";
import SupportPlanSection from "../home/SupportPlanSection";
import RecentActivitySection from "../home/RecentActivitySection";
import StudentProfileView from "../my-profile/StudentProfileView";
import StudentAppointmentsView from "../appointments/StudentAppointmentsView";
import StudentTasksView from "../tasks/StudentTasksView";
import StudentPerformanceView from "../performance/StudentPerformanceView";
import AppointmentModal from "../appointments/AppointmentModal";

export default function StudentDashboardSections({
    activeTab,
    setActiveTab,
    profile,
    profileEdit,
    setProfileEdit,
    onSaveProfile,
    profileSaveMsg,
    appointments,
    statusFilter,
    setStatusFilter,
    tasks,
    onToggleTask,
    performance,
    nextAppointment,
    isBookingOpen,
    onOpenBooking,
    onCloseBooking,
    bookingForm,
    setBookingForm,
    onBookingSubmit,
    bookingSuccessMsg,
}) {
    return (
        <>
            {activeTab === "Home" && (
                <main className="p-8 max-w-6xl">
                    <GreetingSection fullName={profile.fullName} />
                    <NeedToTalkSection onRequestCounselling={onOpenBooking} />
                    <StudentQuickStatsSection
                        nextAppointment={nextAppointment}
                        tasks={tasks}
                    />
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <UpcomingAppointmentSection
                            appointment={nextAppointment}
                            onViewAll={() => setActiveTab("Appointments")}
                            onReschedule={onOpenBooking}
                            onViewDetails={() => setActiveTab("Appointments")}
                        />
                        <SupportPlanSection
                            tasks={tasks}
                            onToggleTask={onToggleTask}
                            onManageTasks={() => setActiveTab("My tasks")}
                        />
                    </div>
                    <RecentActivitySection />
                </main>
            )}
            {activeTab === "My profile" && (
                <StudentProfileView
                    profile={profile}
                    profileEdit={profileEdit}
                    setProfileEdit={setProfileEdit}
                    onSaveProfile={onSaveProfile}
                    saveMsg={profileSaveMsg}
                />
            )}
            {activeTab === "Appointments" && (
                <StudentAppointmentsView
                    appointments={appointments}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    onRequestNew={onOpenBooking}
                />
            )}
            {activeTab === "My tasks" && (
                <StudentTasksView tasks={tasks} onToggleTask={onToggleTask} />
            )}
            {activeTab === "Performance & History" && (
                <StudentPerformanceView performance={performance} />
            )}
            <AppointmentModal
                isOpen={isBookingOpen}
                onClose={onCloseBooking}
                bookingForm={bookingForm}
                setBookingForm={setBookingForm}
                onSubmit={onBookingSubmit}
                successMsg={bookingSuccessMsg}
                mentorList={[
                    `${profile.mentor} (Assigned Mentor · CSE)`,
                    "Dr. Rajesh Kulkarni (HOD · CSE)",
                    "Dr. Sneha Roy (Student Wellness Counselor)",
                ]}
            />
        </>
    );
}
