import AuthLayout from "../components/templates/AuthLayout";
import LoginHeroPanel from "../components/organisms/auth/LoginHeroPanel";
import RoleSelector from "../components/organisms/auth/RoleSelector";
import DemoFillBar from "../components/molecules/DemoFillBar";
import LoginForm from "../components/organisms/auth/LoginForm";
import LoginMobileBranding from "../components/organisms/auth/LoginMobileBranding";
import LoginPageHeading from "../components/organisms/auth/LoginPageHeading";
import LoginFooterNote from "../components/organisms/auth/LoginFooterNote";
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

    return (
        <AuthLayout heroPanel={<LoginHeroPanel />}>
            <LoginMobileBranding />
            <LoginPageHeading />
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
            <LoginFooterNote />
        </AuthLayout>
    );
}
