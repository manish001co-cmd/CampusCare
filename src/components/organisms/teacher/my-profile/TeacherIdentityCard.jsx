import Avatar from "../../../atoms/Avatar";

export default function TeacherIdentityCard({ teacher }) {
    return (
        <div className="mb-6 flex items-center gap-5 border-b border-slate-100 pb-6">
            <Avatar name={teacher.fullName} size="xl" />
            <div>
                <h2 className="text-lg font-bold text-slate-900">
                    {teacher.fullName}
                </h2>
                <p className="text-xs text-slate-500">{teacher.designation}</p>
                <p className="mt-1 text-xs font-semibold text-blue-600">
                    {teacher.department}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">
                    ID: {teacher.identifier}
                </p>
            </div>
        </div>
    );
}
