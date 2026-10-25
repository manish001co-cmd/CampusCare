import { Sparkles } from "lucide-react";

export default function LoginHeroMessage() {
    return (
        <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-900/40 px-3 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
                <Sparkles size={13} />
                CAMPUS COUNSELLING PLATFORM
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
                Empowering every student&apos;s journey.
            </h1>
            <p className="mt-3 text-xs leading-relaxed text-blue-100/75 xl:text-sm">
                Connect with mentors, manage appointments, and track academic
                and mental wellbeing securely in one integrated space.
            </p>
        </div>
    );
}
