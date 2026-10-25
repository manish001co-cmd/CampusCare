import { AlertTriangle, TrendingDown } from "lucide-react";

const EARLY_WARNING_THRESHOLD = 75;

export default function EarlyWarningBadge({ attendance }) {
    if (attendance < EARLY_WARNING_THRESHOLD) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                <AlertTriangle size={10} />
                LOW ATTENDANCE
            </span>
        );
    }
    if (attendance < 80) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                <TrendingDown size={10} />
                AT RISK
            </span>
        );
    }
    return null;
}
