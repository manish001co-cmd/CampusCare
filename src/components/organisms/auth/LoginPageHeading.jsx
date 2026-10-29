export default function LoginPageHeading({ isRegistering = false }) {
    return (
        <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
                Secure Portal Access
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                {isRegistering
                    ? "Create your student account"
                    : "Sign in to your account"}
            </h1>
            <p className="mt-0.5 text-xs text-slate-500">
                {isRegistering
                    ? "Register to access CampusCare student support."
                    : "Select your assigned role and log in with your username."}
            </p>
        </div>
    );
}
