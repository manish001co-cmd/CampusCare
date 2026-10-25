import { useParams, Navigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

export default function Dashboard() {
    const { role } = useParams();

    if (role === "student") {
        return <StudentDashboard />;
    }

    if (role === "teacher") {
        return <TeacherDashboard />;
    }

    if (!["student", "teacher", "hod", "admin"].includes(role)) {
        return <Navigate to="/" replace />;
    }

    // Placeholder for hod / admin (to be built next)
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <span className="font-bold text-lg capitalize">{role[0]}</span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-800 capitalize">
                    {role} Dashboard
                </h2>
                <p className="mt-2 text-xs text-slate-500">
                    Coming soon. Try the Student or Teacher dashboard.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                    <a
                        href="/dashboard/student"
                        className="rounded-xl bg-[#0c4a3b] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#08362a]"
                    >
                        Student Dashboard
                    </a>
                    <a
                        href="/dashboard/teacher"
                        className="rounded-xl bg-[#0f3460] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1a4a7a]"
                    >
                        Teacher Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
