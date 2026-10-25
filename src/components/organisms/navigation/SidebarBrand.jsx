import { X } from "lucide-react";

export default function SidebarBrand({
    title,
    icon: BrandIcon,
    onCloseMobile,
}) {
    return (
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
            <div className="flex items-center gap-3">
                <span className="rounded-xl bg-blue-600 p-2.5">
                    <BrandIcon size={23} />
                </span>
                <div>
                    <h2 className="font-bold">CampusCare</h2>
                    <p className="mt-1 text-xs text-slate-400">{title}</p>
                </div>
            </div>
            <button
                type="button"
                onClick={onCloseMobile}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
                aria-label="Close navigation"
            >
                <X size={20} />
            </button>
        </div>
    );
}
