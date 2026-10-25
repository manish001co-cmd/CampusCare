export default function ProfileModeField({ value, onChange }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-slate-700">
                Preferred Counselling Mode
            </label>
            <select
                value={value || "In-Person (Room 2B)"}
                onChange={(event) => onChange(event.target.value)}
                className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-800 outline-none focus:border-[#0f4437] focus:ring-2 focus:ring-[#0f4437]/10"
            >
                <option value="In-Person (Room 2B)">In-Person (Room 2B)</option>
                <option value="Virtual Video Call">Virtual Video Call</option>
                <option value="Hybrid / Flexible">Hybrid / Flexible</option>
            </select>
        </div>
    );
}
