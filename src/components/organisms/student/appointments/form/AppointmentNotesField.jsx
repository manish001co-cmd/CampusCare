export default function AppointmentNotesField({ value, onChange }) {
    return (
        <div>
            <label
                htmlFor="appointment-notes"
                className="mb-1 block text-xs font-semibold text-slate-700"
            >
                Confidential Notes (Optional)
            </label>
            <textarea
                id="appointment-notes"
                rows={2}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Any specific questions or materials you'd like to review..."
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-[#0c4a3b]"
            />
        </div>
    );
}
