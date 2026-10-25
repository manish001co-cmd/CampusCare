import { LogOut } from "lucide-react";

export default function SidebarLogout({ onLogout }) {
    return (
        <div className="border-t border-white/10 p-3">
            <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"
            >
                <LogOut size={19} />
                Sign out
            </button>
        </div>
    );
}
