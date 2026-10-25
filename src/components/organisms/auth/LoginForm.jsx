import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import LoginPreferences from "./LoginPreferences";
import LoginErrorNotice from "./LoginErrorNotice";
import LoginSubmitButton from "./LoginSubmitButton";

export default function LoginForm({
    username,
    setUsername,
    password,
    setPassword,
    selectedRole,
    onSubmit,
    isLoading,
    error,
    onForgotPassword,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <UsernameField value={username} onChange={setUsername} />
            <PasswordField value={password} onChange={setPassword} />
            <LoginPreferences onForgotPassword={onForgotPassword} />
            <LoginErrorNotice message={error} />
            <LoginSubmitButton
                role={selectedRole}
                isLoading={isLoading}
            />
        </form>
    );
}
