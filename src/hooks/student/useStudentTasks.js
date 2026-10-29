import { useState } from "react";

async function readResponse(response) {
    const body = await response.text();
    let data;
    try {
        data = JSON.parse(body);
    } catch {
        throw new Error(
            `The student API returned an invalid response (HTTP ${response.status}).`
        );
    }

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update the task.");
    }
    return data;
}

export default function useStudentTasks() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    const handleToggleTask = async (taskId) => {
        setError("");
        const token = localStorage.getItem("campuscare_token");
        if (!token) {
            setError("Your session has expired. Please sign in again.");
            return;
        }

        try {
            const response = await fetch(
                `/api/student/tasks/${encodeURIComponent(taskId)}/toggle`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const result = await readResponse(response);
            setTasks((current) =>
                current.map((task) =>
                    task._id === taskId ? result.task : task
                )
            );
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to update the task."
            );
        }
    };

    return { tasks, setTasks, error, handleToggleTask };
}
