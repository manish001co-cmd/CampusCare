import { BookOpen, Mail, MapPin, Phone, Star } from "lucide-react";
import TeacherProfileField from "./TeacherProfileField";

export default function TeacherProfileDetails({ teacher }) {
    const fields = [
        { icon: <Mail size={14} />, label: "Email", value: teacher.email },
        { icon: <Phone size={14} />, label: "Phone", value: teacher.phone },
        { icon: <MapPin size={14} />, label: "Office", value: teacher.office },
        {
            icon: <BookOpen size={14} />,
            label: "Specialization",
            value: teacher.specialization,
        },
        {
            icon: <Star size={14} />,
            label: "Designation",
            value: teacher.designation,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
                <TeacherProfileField key={field.label} {...field} />
            ))}
        </div>
    );
}
