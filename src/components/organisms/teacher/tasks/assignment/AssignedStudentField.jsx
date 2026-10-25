export default function AssignedStudentField({ students, value, onChange }) {
    return (
        <div>
            <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                Assign To
            </label>
            <select
                value={value}
                onChange={(event) => {
                    const student = students.find(
                        (item) => item.id === event.target.value
                    );
                    if (student) onChange(student);
                }}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {students.map((student) => (
                    <option key={student.id} value={student.id}>
                        {student.fullName} ({student.identifier})
                    </option>
                ))}
            </select>
        </div>
    );
}
