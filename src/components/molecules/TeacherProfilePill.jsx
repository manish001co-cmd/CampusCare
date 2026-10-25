import Avatar from "../atoms/Avatar";

export default function TeacherProfilePill({
    mentorName = "Mr. Dilip Menariya",
    mentorRole = "Assigned Faculty Mentor · CSE",
    mentorOffice = "Room 2B",
    onBookClick,
}) {
    return (
        <div className="rounded-2xl border border-[#cfe6d8] bg-white/80 p-3.5 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2e6859]">
                    Assigned Teacher
                </span>
                <span
                    className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
                    title="Available for mentoring"
                />
            </div>

            <div className="mt-2.5 flex items-center gap-2.5">
                <Avatar name={mentorName} variant="gradient" size="lg" />
                <div className="min-w-0 flex-1">
                    <h4 className="truncate text-xs font-bold text-slate-800">
                        {mentorName}
                    </h4>
                    <p className="truncate text-[11px] text-slate-500">
                        {mentorRole}
                    </p>
                </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
                <span className="text-slate-400">Office: {mentorOffice}</span>
                {onBookClick && (
                    <button
                        onClick={onBookClick}
                        className="font-semibold text-[#0f4437] hover:underline"
                    >
                        Book Session ›
                    </button>
                )}
            </div>
        </div>
    );
}
