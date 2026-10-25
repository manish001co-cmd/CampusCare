const notificationTypes = {
    appointment: { icon: "📅", style: "bg-blue-100 text-blue-700" },
    task: { icon: "✅", style: "bg-purple-100 text-purple-700" },
    alert: { icon: "⚠️", style: "bg-rose-100 text-rose-700" },
    info: { icon: "ℹ️", style: "bg-slate-100 text-slate-700" },
};

export default function NotificationItem({ notification }) {
    const type = notificationTypes[notification.type] || notificationTypes.info;

    return (
        <article
            className={`flex items-start gap-3 border-b border-slate-50 px-4 py-3 last:border-0 ${
                notification.read ? "" : "bg-blue-50/50"
            }`}
        >
            <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] ${type.style}`}
            >
                {type.icon}
            </span>
            <div className="min-w-0">
                <p className="text-[11px] font-semibold text-slate-800">
                    {notification.title}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                    {notification.body}
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                    {notification.time}
                </p>
            </div>
        </article>
    );
}
