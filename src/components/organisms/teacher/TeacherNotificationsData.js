const DEFAULT_TEACHER_NOTIFICATIONS = [
    {
        id: "n-1",
        type: "appointment",
        title: "New Appointment Request",
        body: "Jordan Lee requested an academic counselling session.",
        time: "10 min ago",
        read: false,
    },
    {
        id: "n-2",
        type: "alert",
        title: "Early Warning: Lucas Kim",
        body: "Attendance dropped to 71% — below the 75% threshold.",
        time: "1 hour ago",
        read: false,
    },
    {
        id: "n-3",
        type: "task",
        title: "Task Completed",
        body: "Manish Kumar completed: 'Complete weekly study routine plan'.",
        time: "3 hours ago",
        read: true,
    },
];

export default DEFAULT_TEACHER_NOTIFICATIONS;
