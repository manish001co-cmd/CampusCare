import { Notification } from "../models/Notification.js";

function serializeNotification(notification) {
    return {
        id: notification._id,
        title: notification.title,
        body: notification.body,
        type: notification.type,
        read: notification.read,
        time: notification.createdAt
            ? new Date(notification.createdAt).toLocaleString()
            : "Just now",
        createdAt: notification.createdAt,
    };
}

export async function getNotifications(req, res) {
    try {
        const notifications = await Notification.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(25)
            .lean();

        return res.json({
            success: true,
            notifications: notifications.map(serializeNotification),
        });
    } catch (error) {
        console.error("Fetch notifications error:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching notifications.",
        });
    }
}

export async function markNotificationRead(req, res) {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findOne({
            _id: notificationId,
            userId: req.user._id,
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        notification.read = true;
        await notification.save();

        return res.json({
            success: true,
            message: "Notification marked as read.",
            notification: serializeNotification(notification),
        });
    } catch (error) {
        console.error("Mark notification read error:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating notification.",
        });
    }
}

export async function markAllNotificationsRead(req, res) {
    try {
        await Notification.updateMany(
            { userId: req.user._id, read: false },
            { $set: { read: true } }
        );

        return res.json({
            success: true,
            message: "All notifications marked as read.",
        });
    } catch (error) {
        console.error("Mark all notifications read error:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating notifications.",
        });
    }
}
