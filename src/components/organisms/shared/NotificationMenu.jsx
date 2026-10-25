import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import NotificationPanel from "./NotificationPanel";

const accents = {
    emerald: {
        count: "bg-emerald-500",
        newCount: "bg-emerald-100 text-emerald-700",
    },
    blue: {
        count: "bg-blue-600",
        newCount: "bg-blue-100 text-blue-700",
    },
};

export default function NotificationMenu({
    notifications = [],
    accent = "blue",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const unreadCount = notifications.filter((item) => !item.read).length;
    const color = accents[accent] || accents.blue;

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
                className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                aria-label="Notifications"
                aria-expanded={isOpen}
            >
                <Bell size={18} />
                {unreadCount > 0 && (
                    <span
                        className={`absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white ${color.count}`}
                    >
                        {unreadCount}
                    </span>
                )}
            </button>
            {isOpen && (
                <NotificationPanel
                    notifications={notifications}
                    unreadCount={unreadCount}
                    accent={color}
                />
            )}
        </div>
    );
}
