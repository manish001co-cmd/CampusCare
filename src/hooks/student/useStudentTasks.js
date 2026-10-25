import { useState } from "react";
import { studentRoleData } from "../../data/roles/Students";

export default function useStudentTasks() {
    const [tasks, setTasks] = useState(studentRoleData.tasks);

    const handleToggleTask = (taskId) => {
        setTasks((current) =>
            current.map((task) =>
                task._id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );

        const token = localStorage.getItem("campuscare_token");
        if (token) {
            fetch(`/api/student/tasks/${taskId}/toggle`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            }).catch(() => {});
        }
    };

    return { tasks, setTasks, handleToggleTask };
}
