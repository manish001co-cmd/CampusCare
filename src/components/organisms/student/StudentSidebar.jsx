import {
    HeartHandshake,
} from "lucide-react";
import NavItem from "../../molecules/NavItem";
import TeacherProfilePill from "../../molecules/TeacherProfilePill";
import studentNavItems from "./studentNavItems";

export default function StudentSidebar({
    activeTab,
    setActiveTab,
    mentor,
    onBookClick,
}) {
    return (
        <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col justify-between border-r border-[#d8ece0] bg-[#eaf5ef] px-4 py-6">
            <div>
                {/* Branding */}
                <div className="flex items-center gap-3 px-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f4437] text-white shadow-sm">
                        <HeartHandshake size={22} />
                    </span>
                    <div>
                        <h2 className="text-base font-bold tracking-tight text-[#0c362c]">
                            CampusCare
                        </h2>
                        <p className="text-[11px] text-[#2e6859]">
                            Student support
                        </p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-8 space-y-1">
                    {studentNavItems.map((item) => (
                        <NavItem
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            isActive={activeTab === item.label}
                            onClick={() => setActiveTab(item.label)}
                        />
                    ))}
                </nav>
            </div>

            {/* Left bottom side: Profile of assigned teacher */}
            <TeacherProfilePill
                mentorName={mentor?.name || mentor}
                mentorRole={mentor?.role || "Assigned Faculty Mentor · CSE"}
                mentorOffice={mentor?.office || "Room 2B"}
                onBookClick={onBookClick}
            />
        </aside>
    );
}
