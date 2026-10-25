import {
    HeartHandshake,
} from "lucide-react";
import NavItem from "../../molecules/NavItem";
import Avatar from "../../atoms/Avatar";
import teacherNavItems from "./teacherNavItems";

export default function TeacherSidebar({ activeTab, setActiveTab, teacher }) {
    return (
        <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col justify-between border-r border-[#dceaf5] bg-[#eaf1fb] px-4 py-6">
            <div>
                {/* Branding */}
                <div className="flex items-center gap-3 px-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f3460] text-white shadow-sm">
                        <HeartHandshake size={22} />
                    </span>
                    <div>
                        <h2 className="text-base font-bold tracking-tight text-[#0c2240]">
                            CampusCare
                        </h2>
                        <p className="text-[11px] text-[#2e5080]">
                            Faculty Portal
                        </p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-8 space-y-1">
                    {teacherNavItems.map((item) => (
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

            {/* Bottom: Teacher profile */}
            <div className="rounded-xl border border-[#c8daf0] bg-white/70 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <Avatar name={teacher?.fullName || "Dilip Menariya"} size="md" />
                    <div className="min-w-0">
                        <p className="text-[12px] font-bold text-slate-800 truncate">
                            {teacher?.fullName || "Mr. Dilip Menariya"}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                            {teacher?.designation || "Assistant Professor · CSE"}
                        </p>
                        <p className="text-[10px] text-[#1a56db] font-semibold mt-0.5">
                            Faculty Mentor
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
