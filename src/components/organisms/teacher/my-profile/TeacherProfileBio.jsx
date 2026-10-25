export default function TeacherProfileBio({ bio }) {
    return (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Bio
            </p>
            <p className="text-xs text-slate-700">{bio}</p>
        </div>
    );
}
