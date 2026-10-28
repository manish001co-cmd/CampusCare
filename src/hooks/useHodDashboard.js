import { useCallback, useEffect, useState } from "react";

async function readResponse(response) {
    const body = await response.text();
    let data;

    try {
        data = JSON.parse(body);
    } catch {
        const contentType = response.headers.get("content-type") || "unknown";
        const hint =
            response.status === 404
                ? "The HOD API route is unavailable. Restart the backend server and try again."
                : "Check that the backend server is running and the API route is configured.";
        throw new Error(
            `The HOD API returned a non-JSON response (HTTP ${response.status}, ${contentType}). ${hint}`
        );
    }

    if (!response.ok || !data.success) {
        throw new Error(data.message || "The department request failed.");
    }
    return data;
}

async function fetchDashboard() {
    const token = localStorage.getItem("campuscare_token");
    if (!token) {
        throw new Error("Your session has expired. Please sign in again.");
    }

    const response = await fetch("/api/hod/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return readResponse(response);
}

export default function useHodDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            setDashboard(await fetchDashboard());
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to load department data."
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let isCurrent = true;
        fetchDashboard()
            .then((data) => {
                if (isCurrent) setDashboard(data);
            })
            .catch((requestError) => {
                if (isCurrent) {
                    setError(
                        requestError instanceof Error
                            ? requestError.message
                            : "Unable to load department data."
                    );
                }
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false);
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    const assignMentor = async (studentId, facultyId) => {
        const token = localStorage.getItem("campuscare_token");
        if (!token) {
            throw new Error("Your session has expired. Please sign in again.");
        }

        const response = await fetch(
            `/api/hod/students/${studentId}/mentor`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ facultyId }),
            }
        );
        const result = await readResponse(response);

        setDashboard((current) => {
            if (!current) return current;
            const updateMentor = (student) =>
                student.id === studentId
                    ? { ...student, mentor: result.mentor }
                    : student;
            return {
                ...current,
                students: current.students.map(updateMentor),
                studentsAtRisk: current.studentsAtRisk.map(updateMentor),
            };
        });
    };

    return { dashboard, isLoading, error, refresh, assignMentor };
}
