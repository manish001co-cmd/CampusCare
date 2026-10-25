import EarlyWarningStudentRow from "./EarlyWarningStudentRow";

export default function EarlyWarningPanel({ students }) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                    ⚠️
                </span>
                Early Warning Alerts
            </h2>
            {students.length === 0 ? (
                <p className="py-6 text-center text-xs text-slate-400">
                    🎉 All students are above the 75% attendance threshold.
                </p>
            ) : (
                <div className="space-y-2">
                    {students.map((student) => (
                        <EarlyWarningStudentRow key={student.id} student={student} />
                    ))}
                </div>
            )}
        </section>
    );
}
