import { CheckCircle2 } from "lucide-react";

export default function ProfileSaveNotice({ message }) {
    if (!message) return null;

    return (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
            <CheckCircle2 size={16} />
            {message}
        </div>
    );
}
