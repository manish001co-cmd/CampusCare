export default function ProfileBioField({ value, onChange }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-slate-700">
                Bio &amp; Focus Areas
            </label>
            <textarea
                rows={3}
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-[#0f4437] focus:ring-2 focus:ring-[#0f4437]/10"
                placeholder="Tell your counsellor about your goals, hobbies, or challenges..."
            />
        </div>
    );
}
