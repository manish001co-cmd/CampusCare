import StudentPerformanceRow from "./StudentPerformanceRow";

export default function StudentPerformanceTable({ students }) {
    return (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xs font-bold text-slate-700">
                Individual CGPA Overview
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="pb-2 font-semibold text-slate-500">
                                Student
                            </th>
                            <th className="pb-2 font-semibold text-slate-500">
                                CGPA
                            </th>
                            <th className="pb-2 font-semibold text-slate-500">
                                Attendance
                            </th>
                            <th className="pb-2 font-semibold text-slate-500">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {students.map((student) => (
                            <StudentPerformanceRow
                                key={student.id}
                                student={student}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
