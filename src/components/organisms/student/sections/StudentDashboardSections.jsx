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
    recentActivities,
    counsellors,
    dashboardError,
    onRetry,
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
            {dashboardError && (
                <div
                    role="alert"
                    className="mx-8 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                >
                    <span>{dashboardError}</span>
                    <button
                        type="button"
                        onClick={onRetry}
                        className="font-semibold underline"
                    >
                        Retry
                    </button>
                </div>
            )}
            {activeTab === "Home" && (
                <main className="p-8 max-w-6xl">
                    <GreetingSection fullName={profile.fullName} />
                    <NeedToTalkSection onRequestCounselling={onOpenBooking} />
                    <StudentQuickStatsSection
                        nextAppointment={nextAppointment}
                        tasks={tasks}
                        completedSessions={
                            performance?.totalSessionsCompleted ?? 0
                        }
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
                    <RecentActivitySection activities={recentActivities} />
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
                mentorList={counsellors.map((counsellor) => {
                    const detail =
                        counsellor.designation ||
                        (counsellor.role === "hod" ? "HOD" : "Teacher");
                    return `${counsellor.fullName} (${detail} · ${counsellor.department})`;
                })}
            />
        </>
    );
}
