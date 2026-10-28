import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    Building2,
    CalendarDays,
    Check,
    ChevronDown,
    CircleAlert,
    GraduationCap,
    LogOut,
    RefreshCw,
    Search,
    ShieldCheck,
    Users,
} from "lucide-react";
import Avatar from "../components/atoms/Avatar";
import useHodDashboard from "../hooks/useHodDashboard";

const sections = ["Overview", "Students", "Faculty", "Counselling"];

function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("campuscare_user") || "null");
    } catch {
        return null;
    }
}

function formatDate(date) {
    if (!date) return "Date not set";
    const parsedDate = new Date(`${date}T00:00:00`);
    return Number.isNaN(parsedDate.getTime())
        ? date
        : parsedDate.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
          });
}

function PageHeading({ eyebrow, title, description, children }) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                    {eyebrow}
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {title}
                </h1>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
            {children}
        </div>
    );
}

function StatCard({ label, value, detail, icon: Icon, tone }) {
    const tones = {
        indigo: "bg-indigo-50 text-indigo-700",
        blue: "bg-blue-50 text-blue-700",
        amber: "bg-amber-50 text-amber-700",
        emerald: "bg-emerald-50 text-emerald-700",
    };
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                        {value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{detail}</p>
                </div>
                <span className={`rounded-xl p-2.5 ${tones[tone]}`}>
                    <Icon size={20} />
                </span>
            </div>
        </article>
    );
}

function RiskBadge({ reasons }) {
    if (!reasons.length) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <Check size={13} /> On track
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
            <AlertTriangle size={13} /> Needs support
        </span>
    );
}

function EmptyState({ children }) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-sm text-slate-500">
            {children}
        </div>
    );
}

export default function HodDashboard() {
    const user = getStoredUser();
    if (!user || user.role !== "hod" || !localStorage.getItem("campuscare_token")) {
        return <Navigate to="/" replace />;
    }
    return <HodDashboardContent user={user} />;
}

function HodDashboardContent({ user }) {
    const navigate = useNavigate();
    const { dashboard, isLoading, error, refresh, assignMentor } =
        useHodDashboard();
    const [activeSection, setActiveSection] = useState("Overview");
    const [search, setSearch] = useState("");
    const [selectedMentors, setSelectedMentors] = useState({});
    const [savingStudent, setSavingStudent] = useState("");
    const [actionMessage, setActionMessage] = useState("");
    const [actionError, setActionError] = useState("");

    const filteredStudents = useMemo(() => {
        const students = dashboard?.students || [];
        const query = search.trim().toLowerCase();
        if (!query) return students;
        return students.filter((student) =>
            [
                student.fullName,
                student.identifier,
                student.username,
                student.mentor,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [dashboard?.students, search]);

    const filteredFaculty = useMemo(() => {
        const faculty = dashboard?.faculty || [];
        const query = search.trim().toLowerCase();
        if (!query) return faculty;
        return faculty.filter((member) =>
            [member.fullName, member.email, member.identifier]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [dashboard?.faculty, search]);

    const filteredAppointments = useMemo(() => {
        const appointments = dashboard?.appointments || [];
        const query = search.trim().toLowerCase();
        if (!query) return appointments;
        return appointments.filter((appointment) =>
            [
                appointment.studentName,
                appointment.studentIdentifier,
                appointment.counsellorName,
                appointment.title,
                appointment.type,
                appointment.status,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [dashboard?.appointments, search]);

    const logout = () => {
        localStorage.removeItem("campuscare_token");
        localStorage.removeItem("campuscare_user");
        navigate("/", { replace: true });
    };

    const selectSection = (section) => {
        setActiveSection(section);
        setSearch("");
        setActionMessage("");
        setActionError("");
    };

    const handleAssignMentor = async (student) => {
        const facultyId = selectedMentors[student.id];
        if (!facultyId) return;

        setSavingStudent(student.id);
        setActionMessage("");
        setActionError("");
        try {
            await assignMentor(student.id, facultyId);
            setActionMessage(`Mentor updated for ${student.fullName}.`);
        } catch (requestError) {
            setActionError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to assign this mentor."
            );
        } finally {
            setSavingStudent("");
        }
    };

    const summary = dashboard?.summary;
    const profile = dashboard?.profile;

    if (isLoading && !dashboard) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <RefreshCw size={18} className="animate-spin" />
                    Loading department dashboard…
                </div>
            </div>
        );
    }

    if (error && !dashboard) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
                <section className="max-w-md rounded-2xl border border-rose-200 bg-white p-7 text-center shadow-sm">
                    <CircleAlert className="mx-auto text-rose-600" size={30} />
                    <h1 className="mt-3 text-lg font-bold text-slate-900">
                        Department data unavailable
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">{error}</p>
                    <div className="mt-5 flex justify-center gap-3">
                        <button
                            onClick={refresh}
                            className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
                        >
                            Try again
                        </button>
                        <button
                            onClick={logout}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Sign out
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-indigo-100 bg-white px-4 py-6 lg:flex">
                <div className="flex items-center gap-3 px-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-700 text-white">
                        <ShieldCheck size={22} />
                    </span>
                    <div>
                        <p className="font-bold tracking-tight">CampusCare</p>
                        <p className="text-[11px] text-slate-500">Department portal</p>
                    </div>
                </div>
                <p className="mb-2 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Department
                </p>
                <nav className="space-y-1">
                    {sections.map((section, index) => {
                        const icons = [BarChart3, GraduationCap, Users, CalendarDays];
                        const Icon = icons[index];
                        return (
                            <button
                                key={section}
                                onClick={() => selectSection(section)}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                                    activeSection === section
                                        ? "bg-indigo-50 text-indigo-800"
                                        : "text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                <Icon size={18} />
                                {section}
                            </button>
                        );
                    })}
                </nav>
                <div className="mt-auto rounded-2xl border border-indigo-100 bg-indigo-50/70 p-3">
                    <div className="flex items-center gap-3">
                        <Avatar name={profile?.fullName || user.fullName} variant="purple" />
                        <div className="min-w-0">
                            <p className="truncate text-xs font-bold">{profile?.fullName || user.fullName}</p>
                            <p className="truncate text-[10px] text-slate-500">Head of Department</p>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="lg:ml-64">
                <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-7">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Building2 size={17} className="text-indigo-700" />
                            <span className="text-sm font-semibold text-slate-700">
                                {profile?.department || "Department"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={refresh}
                                disabled={isLoading}
                                aria-label="Refresh dashboard data"
                                title="Refresh data"
                                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                            >
                                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                            </button>
                            <div className="hidden items-center gap-2 sm:flex">
                                <Avatar name={profile?.fullName || user.fullName} size="sm" variant="purple" />
                                <span className="max-w-40 truncate text-xs font-semibold text-slate-700">
                                    {profile?.fullName || user.fullName}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={logout}
                                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                <LogOut size={15} />
                                <span className="hidden sm:inline">Sign out</span>
                            </button>
                        </div>
                    </div>
                    <nav className="mt-3 flex gap-1 overflow-x-auto lg:hidden">
                        {sections.map((section) => (
                            <button
                                key={section}
                                onClick={() => selectSection(section)}
                                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold ${
                                    activeSection === section
                                        ? "bg-indigo-50 text-indigo-800"
                                        : "text-slate-500 hover:bg-slate-50"
                                }`}
                            >
                                {section}
                            </button>
                        ))}
                    </nav>
                </header>

                <main className="mx-auto max-w-7xl p-4 sm:p-7">
                    {error && (
                        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                            <span>{error}</span>
                            <button onClick={refresh} className="shrink-0 font-semibold underline">
                                Retry
                            </button>
                        </div>
                    )}
                    {(actionMessage || actionError) && (
                        <div
                            role="status"
                            className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                                actionError
                                    ? "border-rose-200 bg-rose-50 text-rose-800"
                                    : "border-emerald-200 bg-emerald-50 text-emerald-800"
                            }`}
                        >
                            {actionError || actionMessage}
                        </div>
                    )}

                    {activeSection === "Overview" && (
                        <>
                            <PageHeading
                                eyebrow="Head of department"
                                title={`Welcome, ${profile?.fullName?.split(" ")[0] || "HOD"}`}
                                description="A current overview of student wellbeing and department activity."
                            />
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard label="Students" value={summary?.studentCount ?? 0} detail="In your department" icon={GraduationCap} tone="indigo" />
                                <StatCard label="Faculty" value={summary?.facultyCount ?? 0} detail="Department teaching staff" icon={Users} tone="blue" />
                                <StatCard label="Need support" value={summary?.studentsAtRisk ?? 0} detail="Attendance or GPA flags" icon={AlertTriangle} tone="amber" />
                                <StatCard label="Pending requests" value={summary?.pendingAppointments ?? 0} detail={`${summary?.completedSessions ?? 0} completed sessions`} icon={CalendarDays} tone="emerald" />
                            </div>

                            <div className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between gap-4">
                                        <div>
                                            <h2 className="font-bold">Students needing support</h2>
                                            <p className="mt-1 text-xs text-slate-500">Students below attendance or GPA thresholds</p>
                                        </div>
                                        <button onClick={() => selectSection("Students")} className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-700 hover:text-indigo-900">
                                            View students <ArrowRight size={14} />
                                        </button>
                                    </div>
                                    {!dashboard?.studentsAtRisk.length ? (
                                        <EmptyState>No students currently meet the support thresholds.</EmptyState>
                                    ) : (
                                        <div className="divide-y divide-slate-100">
                                            {dashboard.studentsAtRisk.slice(0, 5).map((student) => (
                                                <div key={student.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <Avatar name={student.fullName} size="sm" variant="slate" />
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold">{student.fullName}</p>
                                                            <p className="truncate text-xs text-slate-500">{student.identifier || student.username} · {student.riskReasons.join(", ")}</p>
                                                        </div>
                                                    </div>
                                                    <RiskBadge reasons={student.riskReasons} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>

                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <h2 className="font-bold">Department indicators</h2>
                                    <p className="mt-1 text-xs text-slate-500">Academic health across enrolled students</p>
                                    <div className="mt-5 space-y-5">
                                        <div>
                                            <div className="mb-2 flex justify-between text-sm">
                                                <span className="text-slate-600">Average attendance</span>
                                                <strong>{summary?.averageAttendance ?? 0}%</strong>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                                <div className="h-full rounded-full bg-indigo-600" style={{ width: `${Math.min(summary?.averageAttendance || 0, 100)}%` }} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-2 flex justify-between text-sm">
                                                <span className="text-slate-600">Average GPA</span>
                                                <strong>{summary?.averageGpa ?? 0} / 10</strong>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min((summary?.averageGpa || 0) * 10, 100)}%` }} />
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-indigo-50 p-3 text-xs leading-relaxed text-indigo-900">
                                            Support flags are based on attendance below 85% or GPA below 7.0. Use the Students view to review and assign a faculty mentor.
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="font-bold">Recent counselling requests</h2>
                                        <p className="mt-1 text-xs text-slate-500">Department student appointment activity</p>
                                    </div>
                                    <button onClick={() => selectSection("Counselling")} className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700">
                                        View all <ArrowRight size={14} />
                                    </button>
                                </div>
                                <AppointmentTable appointments={(dashboard?.appointments || []).slice(0, 4)} />
                            </section>
                        </>
                    )}

                    {activeSection === "Students" && (
                        <>
                            <PageHeading
                                eyebrow="Student oversight"
                                title="Students"
                                description="Review academic indicators and assign a faculty mentor."
                            >
                                <SearchBox value={search} onChange={setSearch} placeholder="Search students" />
                            </PageHeading>
                            <StudentTable
                                students={filteredStudents}
                                faculty={dashboard?.faculty || []}
                                selectedMentors={selectedMentors}
                                onSelectMentor={(studentId, facultyId) =>
                                    setSelectedMentors((current) => ({ ...current, [studentId]: facultyId }))
                                }
                                onAssign={handleAssignMentor}
                                savingStudent={savingStudent}
                            />
                        </>
                    )}

                    {activeSection === "Faculty" && (
                        <>
                            <PageHeading
                                eyebrow="Department directory"
                                title="Faculty"
                                description="Faculty members available for student mentoring."
                            >
                                <SearchBox value={search} onChange={setSearch} placeholder="Search faculty" />
                            </PageHeading>
                            {!filteredFaculty.length ? (
                                <EmptyState>No faculty members match this search.</EmptyState>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {filteredFaculty.map((member) => {
                                        const assignedCount = (dashboard?.students || []).filter((student) => student.mentor === member.fullName).length;
                                        return (
                                            <article key={member.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <Avatar name={member.fullName} size="lg" variant="purple" />
                                                    <div className="min-w-0">
                                                        <h2 className="truncate font-bold">{member.fullName}</h2>
                                                        <p className="truncate text-xs text-slate-500">{member.identifier || "Faculty"}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-4 truncate text-sm text-slate-600">{member.email || "No email provided"}</p>
                                                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                                                    <span className="text-slate-500">Assigned students</span>
                                                    <strong className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-800">{assignedCount}</strong>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}

                    {activeSection === "Counselling" && (
                        <>
                            <PageHeading
                                eyebrow="Student support"
                                title="Counselling activity"
                                description="Monitor appointment demand and session status in your department."
                            >
                                <SearchBox value={search} onChange={setSearch} placeholder="Search appointments" />
                            </PageHeading>
                            <div className="mb-5 grid gap-4 sm:grid-cols-3">
                                {Object.entries(summary?.appointmentTypes || {}).map(([type, count]) => (
                                    <article key={type} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <p className="text-xs font-semibold capitalize text-slate-500">{type} counselling</p>
                                        <p className="mt-1 text-2xl font-bold">{count}</p>
                                    </article>
                                ))}
                            </div>
                            <AppointmentTable appointments={filteredAppointments} />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

function SearchBox({ value, onChange, placeholder }) {
    return (
        <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-500 shadow-sm sm:w-64">
            <Search size={16} />
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
        </label>
    );
}

function StudentTable({
    students,
    faculty,
    selectedMentors,
    onSelectMentor,
    onAssign,
    savingStudent,
}) {
    if (!students.length) return <EmptyState>No students match this search.</EmptyState>;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-255 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Student</th>
                            <th className="px-5 py-3 font-semibold">Attendance</th>
                            <th className="px-5 py-3 font-semibold">GPA</th>
                            <th className="px-5 py-3 font-semibold">Support status</th>
                            <th className="px-5 py-3 font-semibold">Faculty mentor</th>
                            <th className="px-5 py-3 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((student) => {
                            const selectedMentor = selectedMentors[student.id] || "";
                            const currentFaculty = faculty.find((member) => member.fullName === student.mentor);
                            const value = selectedMentor || currentFaculty?.id || "";
                            return (
                                <tr key={student.id} className="align-middle">
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-slate-800">{student.fullName}</p>
                                        <p className="mt-0.5 text-xs text-slate-500">{student.identifier || student.username}</p>
                                    </td>
                                    <td className="px-5 py-4">{student.attendance}%</td>
                                    <td className="px-5 py-4">{student.gpa.toFixed(1)}</td>
                                    <td className="px-5 py-4">
                                        <div>
                                            <RiskBadge reasons={student.riskReasons} />
                                            {student.riskReasons.length > 0 && (
                                                <p className="mt-1.5 max-w-48 text-[11px] leading-relaxed text-slate-500">{student.riskReasons.join(" · ")}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="relative max-w-56">
                                            <select
                                                value={value}
                                                onChange={(event) => onSelectMentor(student.id, event.target.value)}
                                                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs text-slate-700 outline-none focus:border-indigo-500"
                                            >
                                                <option value="">Unassigned</option>
                                                {faculty.map((member) => (
                                                    <option key={member.id} value={member.id}>{member.fullName}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
                                        </div>
                                        {student.mentor && !currentFaculty && !selectedMentor && (
                                            <p className="mt-1 text-[10px] text-slate-500">Current: {student.mentor}</p>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        <button
                                            type="button"
                                            disabled={!selectedMentor || selectedMentor === currentFaculty?.id || savingStudent === student.id}
                                            onClick={() => onAssign(student)}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-700 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                                        >
                                            <Check size={14} />
                                            {savingStudent === student.id ? "Saving…" : "Assign"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {!faculty.length && (
                <p className="border-t border-slate-100 px-5 py-3 text-xs text-amber-800">
                    No faculty records exist in this department yet, so mentor assignment is unavailable.
                </p>
            )}
        </div>
    );
}

function AppointmentTable({ appointments }) {
    if (!appointments.length) {
        return <EmptyState>No counselling appointments found.</EmptyState>;
    }
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-190 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Student / topic</th>
                            <th className="px-5 py-3 font-semibold">Counsellor</th>
                            <th className="px-5 py-3 font-semibold">Type</th>
                            <th className="px-5 py-3 font-semibold">Date</th>
                            <th className="px-5 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className="px-5 py-4">
                                    <p className="font-semibold text-slate-800">{appointment.studentName}</p>
                                    <p className="mt-0.5 max-w-sm truncate text-xs text-slate-500">{appointment.title}</p>
                                </td>
                                <td className="px-5 py-4 text-slate-600">{appointment.counsellorName}</td>
                                <td className="px-5 py-4 capitalize text-slate-600">{appointment.type}</td>
                                <td className="px-5 py-4 whitespace-nowrap text-slate-600">{formatDate(appointment.date)} · {appointment.time}</td>
                                <td className="px-5 py-4">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                        appointment.status === "Completed"
                                            ? "bg-emerald-50 text-emerald-700"
                                            : appointment.status === "Pending"
                                              ? "bg-amber-50 text-amber-800"
                                              : appointment.status === "Rejected"
                                                ? "bg-rose-50 text-rose-700"
                                                : "bg-blue-50 text-blue-700"
                                    }`}>
                                        {appointment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
