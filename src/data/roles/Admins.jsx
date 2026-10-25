// Admin Role Data: Departments, HOD Enrollments, User Accounts, Institution Reports
export const adminRoleData = {
    profile: {
        fullName: "System Administrator",
        username: "admin",
        email: "admin@campuscare.edu",
        department: "Campus Administration",
        identifier: "ADMIN-001",
        role: "admin",
        office: "Central Administration Office 402",
        permissions: "Full System Access (RBAC)",
    },

    overviewStats: {
        totalDepartments: 8,
        activeHods: 8,
        hodCoverage: "100%",
        totalStudentsEnrolled: 2486,
        studentGrowth: "+6.4% this term",
        supportCompletionRate: 87,
        completionDelta: "+5% vs last term",
    },

    departments: [
        {
            id: "dept-1",
            name: "Computer Science & Engineering",
            code: "CSE",
            hodName: "Dr. Rajesh Kulkarni",
            totalStudents: 186,
            totalFaculty: 24,
            averagePerformance: 81,
            supportCompletion: 92,
            status: "Improving",
        },
        {
            id: "dept-2",
            name: "Information Technology",
            code: "IT",
            hodName: "Dr. Aisha Rahman",
            totalStudents: 160,
            totalFaculty: 20,
            averagePerformance: 80,
            supportCompletion: 89,
            status: "Strong",
        },
        {
            id: "dept-3",
            name: "Electronics & Communication",
            code: "ECE",
            hodName: "Dr. Marcus Green",
            totalStudents: 140,
            totalFaculty: 18,
            averagePerformance: 76,
            supportCompletion: 78,
            status: "Needs Attention",
        },
        {
            id: "dept-4",
            name: "Mechanical Engineering",
            code: "ME",
            hodName: "Dr. Lina Moore",
            totalStudents: 130,
            totalFaculty: 16,
            averagePerformance: 83,
            supportCompletion: 85,
            status: "On Track",
        },
    ],

    hodEnrollments: [
        {
            id: "enr-1",
            name: "Dr. Rajesh Kulkarni",
            department: "Computer Science & Engineering",
            inviteDate: "Oct 12, 2026",
            status: "Active",
            email: "hod.cse@campuscare.edu",
        },
        {
            id: "enr-2",
            name: "Dr. Aisha Rahman",
            department: "Information Technology",
            inviteDate: "Oct 10, 2026",
            status: "Active",
            email: "aisha.rahman@campuscare.edu",
        },
        {
            id: "enr-3",
            name: "Dr. Lina Moore",
            department: "Mechanical Engineering",
            inviteDate: "Oct 08, 2026",
            status: "Pending",
            email: "lina.moore@campuscare.edu",
        },
    ],

    institutionAlerts: [
        {
            id: "alt-1",
            type: "Performance Dip",
            level: "High",
            description: "ECE department performance dipped 6% this month",
            dueDate: "Review needed",
        },
        {
            id: "alt-2",
            type: "HOD Reviews",
            level: "Medium",
            description: "2 HOD reviews due this week",
            dueDate: "Due in 3 days",
        },
        {
            id: "alt-3",
            type: "Unassigned Students",
            level: "Medium",
            description: "12 students have no assigned support mentor",
            dueDate: "Requires assignment",
        },
    ],
};

export default adminRoleData;
