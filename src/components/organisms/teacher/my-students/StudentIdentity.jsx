import StudentStatusPill from "./StudentStatusPill";

export default function StudentIdentity({ student }) {
    return (
        <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-slate-900">
                    {student.fullName}
                </p>
                <StudentStatusPill status={student.status} />
            </div>
            <p className="mt-0.5 text-[11px] text-slate-500">
                {student.identifier} · {student.program}
            </p>
        </div>
    );
}
