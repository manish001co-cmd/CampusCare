import { Plus } from "lucide-react";
import Button from "../../../atoms/Button";

export default function NeedToTalkSection({ onRequestCounselling }) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#0c4a3b] p-6 text-white shadow-md sm:p-8">
            <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-bold sm:text-xl">
                        Need to talk?
                    </h2>
                    <p className="mt-1 text-xs text-emerald-100/80 sm:text-sm">
                        Request a private counselling appointment when you're ready.
                    </p>
                </div>
                <Button
                    variant="secondary"
                    size="pill"
                    onClick={onRequestCounselling}
                    className="shrink-0 font-bold text-[#0c4a3b] hover:bg-emerald-50"
                >
                    <Plus size={16} />
                    <span>Request counselling</span>
                </Button>
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-emerald-400/20 blur-2xl" />
        </div>
    );
}
