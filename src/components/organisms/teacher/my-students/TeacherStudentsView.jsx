import TeacherStudentsHeader from "./TeacherStudentsHeader";
import TeacherStudentCard from "./TeacherStudentCard";

export default function TeacherStudentsView({ students, onAssignTask }) {
    return (
        <main className="p-8 max-w-6xl">
            <TeacherStudentsHeader count={students.length} />
            <div className="grid grid-cols-1 gap-4">
                {students.map((student) => (
                    <TeacherStudentCard
                        key={student.id}
                        student={student}
                        onAssignTask={onAssignTask}
                    />
                ))}
            </div>
        </main>
    );
}
