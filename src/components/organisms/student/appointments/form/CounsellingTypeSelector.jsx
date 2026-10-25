import { BookOpen, Briefcase, Heart } from "lucide-react";

const types = [
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "personal", label: "Personal", icon: Heart },
];

export default function CounsellingTypeSelector({ value, onChange }) {
    return (
        <fieldset>
            <legend className="mb-1.5 block text-xs font-semibold text-slate-700">
                Select Counselling Type
            </legend>
            <div className="grid grid-cols-3 gap-2">
                {types.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        type="button"
                        aria-pressed={value === id}
                        onClick={() => onChange(id)}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-semibold transition ${
                            value === id
                                ? "border-[#0c4a3b] bg-[#eaf5ef] text-[#0c4a3b] ring-1 ring-[#0c4a3b]"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        <Icon size={16} />
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </fieldset>
    );
}
