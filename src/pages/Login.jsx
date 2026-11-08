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
        demoUser: "demo-student",
    },
    {
        value: "teacher",
        label: "Teacher",
        description: "Students & appointments",
        demoUser: "demo-teacher",
    },
    {
        value: "hod",
        label: "HOD",
        description: "Department management",
        demoUser: "demo-hod",
    },
    {
        value: "admin",
        label: "Admin",
        description: "System administration",
    },
];

export default function Login() {
    const login = useLogin();

    const handleRoleSelect = (roleValue) => {
        const selectedRole = roles.find((role) => role.value === roleValue);
        login.setSelectedRole(roleValue);
        login.setError("");

        if (selectedRole?.demoUser) {
            login.setUsername(selectedRole.demoUser);
            login.setPassword("password123");
        } else {
            login.setUsername("");
            login.setPassword("");
        }
    };

    return (
        <AuthLayout heroPanel={<LoginHeroPanel />}>
            <LoginMobileBranding />
            <LoginPageHeading isRegistering={false} />
            <RoleSelector
                roles={roles}
                selectedRole={login.selectedRole}
                onSelectRole={handleRoleSelect}
            />
            <DemoFillBar
                roles={roles.filter((role) => role.demoUser)}
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
