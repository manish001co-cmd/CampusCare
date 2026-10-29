import { useState } from "react";
import { Building2, LockKeyhole, Mail, User, UserRound } from "lucide-react";
import Input from "../../atoms/Input";
import LoginErrorNotice from "./LoginErrorNotice";

const initialForm = {
    fullName: "",
    username: "",
    email: "",
    department: "",
    identifier: "",
    password: "",
    confirmPassword: "",
};

function RegistrationField({
    id,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    icon,
    required = false,
    autoComplete,
    minLength,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1 block text-xs font-semibold text-slate-700"
            >
                {label}
            </label>
            <Input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                icon={icon}
                required={required}
                autoComplete={autoComplete}
                minLength={minLength}
            />
        </div>
    );
}

export default function StudentRegistrationForm({
    onSubmit,
    isLoading,
    error,
}) {
    const [form, setForm] = useState(initialForm);
    const [passwordError, setPasswordError] = useState("");

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setPasswordError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.password !== form.confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }
        onSubmit(event, form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <RegistrationField
                id="fullName"
                label="Full name"
                value={form.fullName}
                onChange={updateField}
                placeholder="Enter your full name"
                icon={UserRound}
                autoComplete="name"
                required
            />
            <div className="grid gap-3 sm:grid-cols-2">
                <RegistrationField
                    id="username"
                    label="Username"
                    value={form.username}
                    onChange={updateField}
                    placeholder="Choose a username"
                    icon={User}
                    autoComplete="username"
                    minLength={3}
                    required
                />
                <RegistrationField
                    id="email"
                    label="Email (optional)"
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    type="email"
                    icon={Mail}
                    autoComplete="email"
                />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                <RegistrationField
                    id="department"
                    label="Department"
                    value={form.department}
                    onChange={updateField}
                    placeholder="e.g. Computer Science"
                    icon={Building2}
                    required
                />
                <RegistrationField
                    id="identifier"
                    label="Student ID (optional)"
                    value={form.identifier}
                    onChange={updateField}
                    placeholder="e.g. CS2026-084"
                    icon={User}
                />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                <RegistrationField
                    id="password"
                    label="Password"
                    value={form.password}
                    onChange={updateField}
                    placeholder="At least 6 characters"
                    type="password"
                    icon={LockKeyhole}
                    autoComplete="new-password"
                    minLength={6}
                    required
                />
                <RegistrationField
                    id="confirmPassword"
                    label="Confirm password"
                    value={form.confirmPassword}
                    onChange={updateField}
                    placeholder="Re-enter your password"
                    type="password"
                    icon={LockKeyhole}
                    autoComplete="new-password"
                    minLength={6}
                    required
                />
            </div>
            <LoginErrorNotice message={passwordError || error} />
            <button
                type="submit"
                disabled={isLoading}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-[#0c4a3b] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#08362a] disabled:cursor-wait disabled:opacity-60"
            >
                {isLoading ? "Creating account…" : "Create student account"}
            </button>
        </form>
    );
}
