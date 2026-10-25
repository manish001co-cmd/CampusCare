import {
    Building2,
    CalendarDays,
    ChartNoAxesCombined,
    ClipboardList,
    GraduationCap,
    LayoutDashboard,
    Settings,
    ShieldCheck,
    UserRound,
    Users,
} from "lucide-react";

const roleNavigation = {
    student: {
        title: "Student Portal",
        icon: GraduationCap,
        menu: [
            { label: "Overview", icon: LayoutDashboard },
            { label: "My Profile", icon: UserRound },
            { label: "Counselling", icon: CalendarDays },
            { label: "My Tasks", icon: ClipboardList },
            { label: "My Performance", icon: ChartNoAxesCombined },
        ],
    },
    teacher: {
        title: "Teacher Portal",
        icon: Users,
        menu: [
            { label: "Overview", icon: LayoutDashboard },
            { label: "Students", icon: GraduationCap },
            { label: "Appointments", icon: CalendarDays },
            { label: "Assign Tasks", icon: ClipboardList },
            { label: "Performance", icon: ChartNoAxesCombined },
        ],
    },
    hod: {
        title: "HOD Portal",
        icon: Building2,
        menu: [
            { label: "Overview", icon: LayoutDashboard },
            { label: "Students", icon: GraduationCap },
            { label: "Teachers", icon: Users },
            { label: "Appointments", icon: CalendarDays },
            { label: "Department Reports", icon: ChartNoAxesCombined },
        ],
    },
    admin: {
        title: "Admin Portal",
        icon: ShieldCheck,
        menu: [
            { label: "Overview", icon: LayoutDashboard },
            { label: "Departments", icon: Building2 },
            { label: "Manage HODs", icon: Users },
            { label: "User Accounts", icon: UserRound },
            { label: "Performance Reports", icon: ChartNoAxesCombined },
            { label: "Settings", icon: Settings },
        ],
    },
};

export default roleNavigation;
