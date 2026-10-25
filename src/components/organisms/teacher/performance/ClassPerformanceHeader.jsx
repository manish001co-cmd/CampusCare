export default function ClassPerformanceHeader({ studentCount }) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Class Performance
            </h1>
            <p className="mt-1 text-xs text-slate-500">
                Analytics dashboard for {studentCount} assigned students.
            </p>
        </div>
    );
}
