const academicFields = [
    ["Full Name", "fullName"],
    ["Student Roll No", "identifier"],
    ["Department", "department"],
    ["Current Semester", "semester"],
    ["Assigned Faculty Mentor", "mentor"],
    ["Official College Email", "email"],
];

export default function OfficialAcademicInfo({ profile }) {
    return (
        <section className="rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <h2 className="border-b border-slate-100 pb-3 text-sm font-bold text-slate-800">
                Academic Information (Official)
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {academicFields.map(([label, key]) => (
                    <div key={key}>
                        <label className="text-xs font-semibold text-slate-500">
                            {label}
                        </label>
                        <p
                            className={`mt-1 text-sm font-bold ${
                                key === "mentor"
                                    ? "text-emerald-800"
                                    : "text-slate-800"
                            }`}
                        >
                            {profile[key]}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
