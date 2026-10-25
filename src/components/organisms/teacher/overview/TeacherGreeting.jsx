export default function TeacherGreeting({ teacher }) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome back, {teacher.fullName.replace("Mr. ", "").split(" ")[0]}
            </h1>
            <p className="mt-1 text-xs text-slate-500">
                {teacher.department} · {teacher.designation}
            </p>
        </div>
    );
}
