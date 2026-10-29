import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState("student");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleQuickFill = (role) => {
        setSelectedRole(role.value);
        setUsername(role.demoUser);
        setPassword("password123");
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!username.trim() || !password) {
            setError("Please enter your username and password.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                    role: selectedRole,
                }),
            });

            const responseBody = await response.text();
            let data;
            try {
                data = JSON.parse(responseBody);
            } catch {
                const responseDetail = responseBody.trim()
                    ? "The login server returned an invalid response."
                    : "The login server returned an empty response.";
                throw new Error(
                    `${responseDetail} (HTTP ${response.status}). Please make sure the backend is running and try again.`
                );
            }

            if (!response.ok || !data?.success) {
                throw new Error(
                    data?.message ||
                        "Invalid credentials or unauthorized role."
                );
            }
            if (!data.token || !data.user?.role) {
                throw new Error(
                    "The login server returned incomplete account details. Please try again later."
                );
            }

            localStorage.setItem("campuscare_token", data.token);
            localStorage.setItem("campuscare_user", JSON.stringify(data.user));
            navigate(`/dashboard/${data.user.role}`, {
                replace: true,
                state: { user: data.user },
            });
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Failed to connect to the server. Please check the backend."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (event, registration) => {
        event.preventDefault();
        setError("");

        if (
            !registration.fullName.trim() ||
            !registration.username.trim() ||
            !registration.department.trim() ||
            !registration.password
        ) {
            setError("Please complete all required fields.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: registration.fullName,
                    username: registration.username,
                    email: registration.email,
                    department: registration.department,
                    identifier: registration.identifier,
                    password: registration.password,
                }),
            });

            const responseBody = await response.text();
            let data;
            try {
                data = JSON.parse(responseBody);
            } catch {
                throw new Error(
                    `The registration server returned an invalid response (HTTP ${response.status}). Please make sure the backend is running and try again.`
                );
            }

            if (!response.ok || !data?.success) {
                throw new Error(data?.message || "Unable to create the account.");
            }
            if (!data.token || data.user?.role !== "student") {
                throw new Error(
                    "The registration server returned incomplete account details. Please try again later."
                );
            }

            localStorage.setItem("campuscare_token", data.token);
            localStorage.setItem("campuscare_user", JSON.stringify(data.user));
            navigate("/dashboard/student", {
                replace: true,
                state: { user: data.user },
            });
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Failed to connect to the server. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        setError(
            "Password reset is managed by the administrator. Contact support or use standard demo accounts (password: password123)."
        );
    };

    return {
        selectedRole,
        setSelectedRole,
        username,
        setUsername,
        password,
        setPassword,
        error,
        setError,
        isLoading,
        handleQuickFill,
        handleSubmit,
        handleRegister,
        handleForgotPassword,
    };
}
