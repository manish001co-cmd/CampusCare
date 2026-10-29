import { useCallback, useEffect, useState } from "react";

async function readResponse(response) {
    const body = await response.text();
    let data;
    try {
        data = JSON.parse(body);
    } catch {
        throw new Error(
            `The teacher API returned an invalid response (HTTP ${response.status}). Restart the backend and try again.`
        );
    }

    if (!response.ok || !data.success) {
        throw new Error(data.message || "The teacher request failed.");
    }
    return data;
}

function getToken() {
    const token = localStorage.getItem("campuscare_token");
    if (!token) throw new Error("Your session has expired. Please sign in again.");
    return token;
}

function makeNotifications(requests, tasks) {
    return [
        ...requests
            .filter((request) => request.status === "New")
            .map((request) => ({
                id: `appointment-${request.id}`,
                type: "appointment",
                title: "New appointment request",
                body: `${request.studentName} requested: ${request.title}`,
                time: request.date,
                read: false,
            })),
        ...tasks
            .filter((task) => task.status === "Completed")
            .map((task) => ({
                id: `task-${task.id}`,
                type: "task",
                title: "Task completed",
                body: `${task.studentName} completed: "${task.task}"`,
                time: task.assignedDate,
                read: false,
            })),
    ].slice(0, 10);
}

export default function useTeacherDashboard() {
    const [teacher, setTeacher] = useState({});
    const [stats, setStats] = useState({
        assignedStudentsCount: 0,
        pendingAppointmentsCount: 0,
        openTasksCount: 0,
        averageClassPerformance: 0,
    });
    const [students, setStudents] = useState([]);
    const [requests, setRequests] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [assignTarget, setAssignTarget] = useState(null);

    const refresh = useCallback(async () => {
        setError("");
        const response = await fetch("/api/teacher/dashboard", {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await readResponse(response);
        setTeacher(data.teacher);
        setStats(data.stats);
        setStudents(data.students || []);
        setRequests(data.requests || []);
        setTasks(data.tasks || []);
        setNotifications(
            makeNotifications(data.requests || [], data.tasks || [])
        );
    }, []);

    useEffect(() => {
        let isCurrent = true;
        const loadDashboard = async () => {
            setIsLoading(true);
            setError("");
            try {
                const response = await fetch("/api/teacher/dashboard", {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                const data = await readResponse(response);
                if (!isCurrent) return;
                setTeacher(data.teacher);
                setStats(data.stats);
                setStudents(data.students || []);
                setRequests(data.requests || []);
                setTasks(data.tasks || []);
                setNotifications(
                    makeNotifications(data.requests || [], data.tasks || [])
                );
            } catch (requestError) {
                if (isCurrent) {
                    setError(
                        requestError instanceof Error
                            ? requestError.message
                            : "Unable to load teacher dashboard."
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
    }, [reloadKey]);

    const runMutation = async (url, method, body) => {
        setError("");
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    ...(body ? { "Content-Type": "application/json" } : {}),
                    Authorization: `Bearer ${getToken()}`,
                },
                ...(body ? { body: JSON.stringify(body) } : {}),
            });
            await readResponse(response);
            await refresh();
            return true;
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to save the teacher dashboard change."
            );
            return false;
        }
    };

    const handleAppointmentAction = (requestId, status, rescheduleData) =>
        runMutation(
            `/api/teacher/appointments/${encodeURIComponent(requestId)}`,
            "PATCH",
            { status, ...(rescheduleData || {}) }
        );

    const handleAddTask = async (newTask) => {
        const created = await runMutation("/api/teacher/tasks", "POST", {
            studentId: newTask.studentId,
            title: newTask.task,
            dueDate: newTask.dueDate,
            priority: newTask.priority,
            feedback: newTask.feedback,
        });
        return created;
    };

    const handleMarkDone = (taskId) =>
        runMutation(
            `/api/teacher/tasks/${encodeURIComponent(taskId)}/complete`,
            "PATCH"
        );

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
        isLoading,
        error,
        refresh: () => setReloadKey((current) => current + 1),
        handleAppointmentAction,
        handleAddTask,
        handleMarkDone,
        isAssignOpen,
        assignTarget,
        handleOpenAssign,
        closeAssign,
        setIsAssignOpen,
    };
}
