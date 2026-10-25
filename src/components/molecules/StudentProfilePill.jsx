import { LogOut } from "lucide-react";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";

export default function StudentProfilePill({
    fullName = "Manish Kumar",
    identifier = "CS2026-084",
    onLogout,
}) {
    return (
        <div className="flex items-center gap-3">
            {/* Student Profile Card */}
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1 pl-1.5 pr-3 shadow-sm">
                <Avatar name={fullName} variant="blue" size="md" />
                <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 leading-none">
                        {fullName}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Student · {identifier}
                    </p>
                </div>
            </div>

            {/* Logout Button */}
            {onLogout && (
                <Button
                    variant="danger"
                    size="sm"
                    onClick={onLogout}
                    title="Sign out of student account"
                >
                    <LogOut size={14} />
                    <span>Logout</span>
                </Button>
            )}
        </div>
    );
}
