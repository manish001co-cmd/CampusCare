import { useState } from "react";
import { teacherRoleData } from "../../data/roles/Teachers";
import DEFAULT_TEACHER_NOTIFICATIONS from "../../components/organisms/teacher/TeacherNotificationsData";

export default function useTeacherDashboard() {
    const [teacher] = useState(teacherRoleData.profile);
    const [stats] = useState(teacherRoleData.stats);
    const [students] = useState(teacherRoleData.assignedStudents);
    const [requests, setRequests] = useState(
        teacherRoleData.appointmentRequests
    );
    const [tasks, setTasks] = useState(teacherRoleData.assignedTasksList);
    const [notifications, setNotifications] = useState(
        DEFAULT_TEACHER_NOTIFICATIONS
    );
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [assignTarget, setAssignTarget] = useState(null);

    const handleAppointmentAction = (
        requestId,
        newStatus,
        rescheduleData
    ) => {
        setRequests((current) =>
            current.map((request) =>
                request.id === requestId
                    ? {
                          ...request,
                          status: newStatus,
                          ...(rescheduleData || {}),
                      }
                    : request
            )
        );

        const request = requests.find((item) => item.id === requestId);
        if (request) {
            const notification = {
                id: `n-${Date.now()}`,
                type:
                    newStatus === "Accepted"
                        ? "task"
                        : newStatus === "Rescheduled"
                          ? "appointment"
                          : "alert",
                title: `Appointment ${newStatus}`,
                body: `${request.studentName}'s request has been ${newStatus.toLowerCase()}.`,
                time: "Just now",
                read: false,
            };
            setNotifications((current) => [notification, ...current]);
        }
    };

    const handleAddTask = (newTask) => {
        setTasks((current) => [newTask, ...current]);
        const notification = {
            id: `n-${Date.now()}`,
            type: "task",
            title: "Task Assigned",
            body: `New task assigned to ${newTask.studentName}: "${newTask.task}"`,
            time: "Just now",
            read: false,
        };
        setNotifications((current) => [notification, ...current]);
    };

    const handleMarkDone = (taskId) => {
        setTasks((current) =>
            current.map((task) =>
                task.id === taskId ? { ...task, status: "Completed" } : task
            )
        );
    };

    const handleOpenAssign = (student) => {
        setAssignTarget(student);
        setIsAssignOpen(true);
    };

    const closeAssign = () => {
        setIsAssignOpen(false);
        setAssignTarget(null);
    };

    return {
        teacher,
        stats,
        students,
        requests,
        tasks,
        notifications,
        isAssignOpen,
        assignTarget,
        handleAppointmentAction,
        handleAddTask,
        handleMarkDone,
        handleOpenAssign,
        closeAssign,
        setIsAssignOpen,
    };
}
