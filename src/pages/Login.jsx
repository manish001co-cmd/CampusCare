import { useState } from "react";
import AuthLayout from "../components/templates/AuthLayout";
import LoginHeroPanel from "../components/organisms/auth/LoginHeroPanel";
import RoleSelector from "../components/organisms/auth/RoleSelector";
import DemoFillBar from "../components/molecules/DemoFillBar";
import LoginForm from "../components/organisms/auth/LoginForm";
import LoginMobileBranding from "../components/organisms/auth/LoginMobileBranding";
import LoginPageHeading from "../components/organisms/auth/LoginPageHeading";
import LoginFooterNote from "../components/organisms/auth/LoginFooterNote";
import StudentRegistrationForm from "../components/organisms/auth/StudentRegistrationForm";
import useLogin from "../hooks/useLogin";

const roles = [
    {
        value: "student",
        label: "Student",
        description: "Profile & counselling",
        demoUser: "student",
    },
    {
        value: "teacher",
        label: "Teacher",
        description: "Students & appointments",
        demoUser: "teacher",
    },
    {
        value: "hod",
        label: "HOD",
        description: "Department management",
        demoUser: "hod",
    },
    {
        value: "admin",
        label: "Admin",
        description: "System administration",
        demoUser: "admin",
    },
];

export default function Login() {
    const login = useLogin();
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <AuthLayout heroPanel={<LoginHeroPanel />}>
            <LoginMobileBranding />
            <LoginPageHeading isRegistering={isRegistering} />
            {isRegistering ? (
                <StudentRegistrationForm
                    onSubmit={login.handleRegister}
                    isLoading={login.isLoading}
                    error={login.error}
                />
            ) : (
                <>
            <RoleSelector
                roles={roles}
                selectedRole={login.selectedRole}
                onSelectRole={(role) => {
                    login.setSelectedRole(role);
                    login.setError("");
                }}
            />
            <DemoFillBar
                roles={roles}
                selectedRole={login.selectedRole}
                onQuickFill={login.handleQuickFill}
            />
            <LoginForm
                username={login.username}
                setUsername={login.setUsername}
                password={login.password}
                setPassword={login.setPassword}
                selectedRole={login.selectedRole}
                onSubmit={login.handleSubmit}
                isLoading={login.isLoading}
                error={login.error}
                onForgotPassword={login.handleForgotPassword}
            />
                </>
            )}
            <div className="mt-4 text-center text-xs text-slate-600">
                {isRegistering ? "Already have an account?" : "New to CampusCare?"}{" "}
                <button
                    type="button"
                    onClick={() => {
                        setIsRegistering((current) => !current);
                        login.setError("");
                    }}
                    className="font-bold text-[#0c4a3b] hover:underline"
                >
                    {isRegistering ? "Sign in" : "Create student account"}
                </button>
            </div>
            <LoginFooterNote />
        </AuthLayout>
    );
}
