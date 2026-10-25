import NotificationItem from "./NotificationItem";

export default function NotificationPanel({
    notifications,
    unreadCount,
    accent,
}) {
    return (
        <section
            aria-label="Notifications"
            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl"
        >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-xs font-bold text-slate-800">
                    Notifications
                </span>
                {unreadCount > 0 && (
                    <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${accent.newCount}`}
                    >
                        {unreadCount} new
                    </span>
                )}
            </div>
            <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="py-6 text-center text-xs text-slate-400">
                        No notifications
                    </p>
                ) : (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
