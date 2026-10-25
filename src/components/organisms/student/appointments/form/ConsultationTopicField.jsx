export default function ConsultationTopicField({ value, onChange }) {
    return (
        <div>
            <label
                htmlFor="appointment-topic"
                className="mb-1 block text-xs font-semibold text-slate-700"
            >
                Topic or Reason for Consultation
            </label>
            <input
                id="appointment-topic"
                type="text"
                required
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="e.g. Midterm revision stress & course advice"
                className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-800 outline-none focus:border-[#0c4a3b]"
            />
        </div>
    );
}
