const timeSlots = [
    "10:00 AM - 10:45 AM",
    "11:00 AM - 11:45 AM",
    "02:00 PM - 02:45 PM",
    "03:30 PM - 04:15 PM",
];

export default function AppointmentScheduleFields({
    date,
    time,
    onDateChange,
    onTimeChange,
}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            <div>
                <label
                    htmlFor="appointment-date"
                    className="mb-1 block text-xs font-semibold text-slate-700"
                >
                    Preferred Date
                </label>
                <input
                    id="appointment-date"
                    type="date"
                    required
                    value={date}
                    onChange={(event) => onDateChange(event.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-800 outline-none focus:border-[#0c4a3b]"
                />
            </div>
            <div>
                <label
                    htmlFor="appointment-time"
                    className="mb-1 block text-xs font-semibold text-slate-700"
                >
                    Preferred Time Slot
                </label>
                <select
                    id="appointment-time"
                    value={time}
                    onChange={(event) => onTimeChange(event.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-[#0c4a3b]"
                >
                    {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
