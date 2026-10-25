export default function CounsellorField({ value, mentors, onChange }) {
    return (
        <div>
            <label
                htmlFor="appointment-counsellor"
                className="mb-1 block text-xs font-semibold text-slate-700"
            >
                Counsellor / Mentor
            </label>
            <select
                id="appointment-counsellor"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-[#0c4a3b]"
            >
                {mentors.map((mentor) => (
                    <option key={mentor} value={mentor.split(" (")[0]}>
                        {mentor}
                    </option>
                ))}
            </select>
        </div>
    );
}
