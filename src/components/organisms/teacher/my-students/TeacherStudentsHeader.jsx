import { AlertTriangle } from "lucide-react";

export default function TeacherStudentsHeader({ count }) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    My Students
                </h1>
                <p className="mt-1 text-xs text-slate-500">
                    Showing {count} assigned students · Early-warning flags
                    auto-trigger below 75% attendance
                </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700">
                <AlertTriangle size={11} />
                Early Warning Active
            </span>
        </div>
    );
}
