import { HeartHandshake } from "lucide-react";

export default function LoginMobileBranding() {
    return (
        <div className="mb-4 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <HeartHandshake size={20} />
            </span>
            <div>
                <h2 className="text-base font-bold leading-tight text-slate-900">
                    CampusCare
                </h2>
                <p className="text-[10px] text-slate-500">
                    Student Counselling Portal
                </p>
            </div>
        </div>
    );
}
