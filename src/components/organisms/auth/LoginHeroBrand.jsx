import { HeartHandshake } from "lucide-react";

export default function LoginHeroBrand() {
    return (
        <div className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-md">
                <HeartHandshake size={24} className="text-blue-300" />
            </span>
            <div>
                <h2 className="text-lg font-bold tracking-tight">CampusCare</h2>
                <p className="text-[11px] text-blue-200/80">
                    Student Counselling &amp; Mentorship
                </p>
            </div>
        </div>
    );
}
