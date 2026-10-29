import TeacherOverview from "../overview/TeacherOverview";
import TeacherStudentsView from "../my-students/TeacherStudentsView";
import TeacherAppointmentsView from "../appointments/TeacherAppointmentsView";
import TeacherTasksView from "../tasks/TeacherTasksView";
import TeacherPerformanceView from "../performance/TeacherPerformanceView";
import TeacherProfileView from "../my-profile/TeacherProfileView";
import AssignTaskModal from "../tasks/AssignTaskModal";

export default function TeacherDashboardSections({
    activeTab,
    setActiveTab,
    teacher,
    stats,
    students,
    requests,
    onAppointmentAction,
    tasks,
    onAddTask,
    onMarkDone,
    isAssignOpen,
    onCloseAssign,
    assignTarget,
    onAssign,
    onOpenAssign,
}) {
    return (
        <>
            {activeTab === "Overview" && (
                <TeacherOverview
                    teacher={teacher}
                    stats={stats}
                    students={students}
                    requests={requests}
                    onNavigate={setActiveTab}
                />
            )}
            {activeTab === "My Students" && (
                <TeacherStudentsView
                    students={students}
                    onAssignTask={onOpenAssign}
                />
            )}
            {activeTab === "Appointments" && (
                <TeacherAppointmentsView
                    requests={requests}
                    onAction={onAppointmentAction}
                />
            )}
            {activeTab === "Tasks" && (
                <TeacherTasksView
                    tasks={tasks}
                    students={students}
                    onAddTask={onAddTask}
                    onMarkDone={onMarkDone}
                />
            )}
            {activeTab === "Performance" && (
                <TeacherPerformanceView
                    students={students}
                    stats={stats}
                    tasks={tasks}
                    requests={requests}
                />
            )}
            {activeTab === "My Profile" && (
                <TeacherProfileView teacher={teacher} />
            )}
            <AssignTaskModal
                isOpen={isAssignOpen}
                onClose={onCloseAssign}
                student={assignTarget}
                students={students}
                onAssign={onAssign}
            />
        </>
    );
}
