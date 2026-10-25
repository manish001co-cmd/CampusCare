const DEFAULT_STUDENT_NOTIFICATIONS = [
    {
        id: "sn-1",
        type: "appointment",
        title: "Appointment Accepted",
        body: "Mr. Dilip Menariya accepted your academic counselling session for Oct 28.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: "sn-2",
        type: "task",
        title: "New Task Assigned",
        body: "Mr. Dilip Menariya assigned: 'Complete weekly study routine plan'.",
        time: "Yesterday",
        read: false,
    },
    {
        id: "sn-3",
        type: "info",
        title: "Session Reminder",
        body: "Your academic counselling session is in 2 days — Oct 28 at 10:30 AM.",
        time: "1 day ago",
        read: true,
    },
];

export default DEFAULT_STUDENT_NOTIFICATIONS;
