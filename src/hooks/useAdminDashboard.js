import { useCallback, useEffect, useState } from "react";

async function readApiResponse(response) {
    const body = await response.text();
    let data;
    try {
        data = JSON.parse(body);
    } catch {
        throw new Error(
            `The admin API returned an invalid response (HTTP ${response.status}). Check that the backend is running and up to date.`
        );
    }

    if (!response.ok || !data.success) {
        throw new Error(data.message || "The admin request failed.");
    }
    return data;
}

async function requestDashboard() {
    const token = localStorage.getItem("campuscare_token");
    if (!token) throw new Error("Your session has expired. Please sign in again.");

    const response = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return readApiResponse(response);
}

export default function useAdminDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            setDashboard(await requestDashboard());
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to load administration data."
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let isCurrent = true;
        requestDashboard()
            .then((data) => {
                if (isCurrent) setDashboard(data);
            })
            .catch((requestError) => {
                if (isCurrent) {
                    setError(
                        requestError instanceof Error
                            ? requestError.message
                            : "Unable to load administration data."
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

    const createAccount = async (account) => {
        const token = localStorage.getItem("campuscare_token");
        if (!token) throw new Error("Your session has expired. Please sign in again.");

        const response = await fetch("/api/admin/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(account),
        });
        const result = await readApiResponse(response);
        await refresh();
        return result;
    };

    const updateTeacher = async (userId, updates) => {
        const token = localStorage.getItem("campuscare_token");
        if (!token) throw new Error("Your session has expired. Please sign in again.");

        const response = await fetch(`/api/admin/users/${encodeURIComponent(userId)}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(updates),
        });
        const result = await readApiResponse(response);
        await refresh();
        return result;
    };

    const deleteAccount = async (userId) => {
        const token = localStorage.getItem("campuscare_token");
        if (!token) throw new Error("Your session has expired. Please sign in again.");

        const response = await fetch(`/api/admin/users/${encodeURIComponent(userId)}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
        });
        const result = await readApiResponse(response);
        await refresh();
        return result;
    };

    return {
        dashboard,
        isLoading,
        error,
        refresh,
        createAccount,
        updateTeacher,
        deleteAccount,
    };
}
