import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Avatar from "../../atoms/Avatar";

export default function TeacherProfileMenu({ teacher, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", closeOnOutsideClick);
        return () =>
            document.removeEventListener("mousedown", closeOnOutsideClick);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                className="flex items-center gap-2 rounded-xl border border-[#d0e3f8] bg-white/80 px-3 py-1.5 shadow-sm transition hover:bg-blue-50"
            >
                <Avatar
                    name={teacher?.fullName || "Dilip Menariya"}
                    size="sm"
                />
                <div className="hidden text-left sm:block">
                    <p className="text-[11px] font-bold leading-tight text-slate-800">
                        {teacher?.fullName || "Mr. Dilip Menariya"}
                    </p>
                    <p className="text-[9px] text-slate-500">
                        Faculty Mentor · CSE
                    </p>
                </div>
                <ChevronDown size={12} className="text-slate-400" />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white py-1 shadow-xl">
                    <button
                        type="button"
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[12px] text-slate-700 hover:bg-slate-50"
                    >
                        <User size={13} />
                        My Profile
                    </button>
                    <button
                        type="button"
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[12px] text-slate-700 hover:bg-slate-50"
                    >
                        <Settings size={13} />
                        Settings
                    </button>
                    <div className="mt-1 border-t border-slate-100 pt-1">
                        <button
                            type="button"
                            onClick={onLogout}
                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold text-rose-600 hover:bg-rose-50"
                        >
                            <LogOut size={13} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
