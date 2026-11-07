import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import NotificationPanel from "./NotificationPanel";

async function getToken() {
    const token = localStorage.getItem("campuscare_token");
    if (!token) return "";
    return token;
}

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
    const [menuNotifications, setMenuNotifications] = useState(notifications);
    const menuRef = useRef(null);
    const unreadCount = menuNotifications.filter((item) => !item.read).length;
    const color = accents[accent] || accents.blue;

    useEffect(() => {
        setMenuNotifications(notifications);
    }, [notifications]);

    const handleMarkRead = async (notificationId) => {
        const token = await getToken();
        if (!token) return;

        try {
            const response = await fetch(`/api/notifications/${notificationId}/read`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const payload = await response.json().catch(() => null);
            if (!response.ok || !payload?.success) {
                throw new Error(payload?.message || "Unable to mark notification as read.");
            }
            setMenuNotifications((current) =>
                current.map((item) =>
                    item.id === notificationId ? { ...item, read: true } : item
                )
            );
        } catch (error) {
            console.error("Mark notification read failed:", error);
        }
    };

    const handleMarkAllRead = async () => {
        const token = await getToken();
        if (!token) return;

        try {
            const response = await fetch("/api/notifications/read-all", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const payload = await response.json().catch(() => null);
            if (!response.ok || !payload?.success) {
                throw new Error(payload?.message || "Unable to mark all notifications as read.");
            }
            setMenuNotifications((current) =>
                current.map((item) => ({ ...item, read: true }))
            );
        } catch (error) {
            console.error("Mark all notifications read failed:", error);
        }
    };

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
                    notifications={menuNotifications}
                    unreadCount={unreadCount}
                    accent={color}
                    onMarkRead={handleMarkRead}
                    onMarkAllRead={handleMarkAllRead}
                />
            )}
        </div>
    );
}
