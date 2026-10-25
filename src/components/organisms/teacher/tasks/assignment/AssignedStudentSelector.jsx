import SelectedStudentPreview from "./SelectedStudentPreview";

export default function AssignedStudentSelector({
    students,
    selectedStudentId,
    onSelect,
}) {
    const selectedStudent =
        students.find((item) => item.id === selectedStudentId) || students[0];

    return (
        <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Assign To
            </label>
            <select
                value={selectedStudentId}
                onChange={(event) => {
                    const nextStudent = students.find(
                        (item) => item.id === event.target.value
                    );
                    if (nextStudent) onSelect(nextStudent);
                }}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {students.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.fullName} ({item.identifier})
                    </option>
                ))}
            </select>
            {selectedStudent && (
                <SelectedStudentPreview student={selectedStudent} />
            )}
        </div>
    );
}
