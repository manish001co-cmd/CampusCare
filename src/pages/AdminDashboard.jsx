import { Fragment, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Activity,
    Building2,
    Check,
    CircleAlert,
    GraduationCap,
    LogOut,
    Pencil,
    Plus,
    RefreshCw,
    Search,
    Save,
    ShieldCheck,
    Trash2,
    Users,
    X,
} from "lucide-react";
import Avatar from "../components/atoms/Avatar";
import useAdminDashboard from "../hooks/useAdminDashboard";

const sections = ["Overview", "Accounts", "Departments"];
const accountRoles = ["student", "teacher", "hod", "admin"];

function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("campuscare_user") || "null");
    } catch {
        return null;
    }
}

export default function AdminDashboard() {
    const user = getStoredUser();
    if (!user || user.role !== "admin" || !localStorage.getItem("campuscare_token")) {
        return <Navigate to="/" replace />;
    }
    return <AdminDashboardContent user={user} />;
}

function AdminDashboardContent({ user }) {
    const navigate = useNavigate();
    const {
        dashboard,
        isLoading,
        error,
        refresh,
        createAccount,
        updateTeacher,
        deleteAccount,
    } =
        useAdminDashboard();
    const [activeSection, setActiveSection] = useState("Overview");
    const [search, setSearch] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [workingAccountId, setWorkingAccountId] = useState("");
    const [actionMessage, setActionMessage] = useState("");
    const [actionError, setActionError] = useState("");
    const [form, setForm] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        role: "student",
        department: "",
        identifier: "",
        phone: "",
        bio: "",
        designation: "",
        office: "",
        specialization: "",
    });

    const visibleUsers = useMemo(() => {
        const accounts = dashboard?.users || [];
        const query = search.trim().toLowerCase();
        if (!query) return accounts;
        return accounts.filter((account) =>
            [
                account.fullName,
                account.username,
                account.email,
                account.role,
                account.department,
                account.identifier,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [dashboard?.users, search]);

    const visibleDepartments = useMemo(() => {
        const departments = dashboard?.departments || [];
        const query = search.trim().toLowerCase();
        if (!query) return departments;
        return departments.filter((department) =>
            department.name.toLowerCase().includes(query)
        );
    }, [dashboard?.departments, search]);

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
        setIsCreateOpen(false);
    };

    const updateForm = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        setActionMessage("");
        setActionError("");
        setIsSaving(true);
        try {
            const result = await createAccount(form);
            setActionMessage(result.message);
            setForm({
                username: "",
                password: "",
                fullName: "",
                email: "",
                role: "student",
                department: "",
                identifier: "",
                phone: "",
                bio: "",
                designation: "",
                office: "",
                specialization: "",
            });
            setIsCreateOpen(false);
        } catch (requestError) {
            setActionError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to create the account."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateTeacher = async (userId, updates) => {
        setActionMessage("");
        setActionError("");
        setWorkingAccountId(userId);
        try {
            const result = await updateTeacher(userId, updates);
            setActionMessage(result.message);
            return true;
        } catch (requestError) {
            setActionError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to update teacher information."
            );
            return false;
        } finally {
            setWorkingAccountId("");
        }
    };

    const handleDeleteAccount = async (account) => {
        const accountLabel = account.role === "hod" ? "HOD" : account.role;
        const relatedDataWarning =
            account.role === "student"
                ? " The student's tasks and appointments will also be deleted."
                : "";
        if (
            !window.confirm(
                `Permanently delete ${accountLabel} account for ${account.fullName}?${relatedDataWarning}`
            )
        ) {
            return;
        }

        setActionMessage("");
        setActionError("");
        setWorkingAccountId(account.id);
        try {
            const result = await deleteAccount(account.id);
            setActionMessage(result.message);
        } catch (requestError) {
            setActionError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to delete the account."
            );
        } finally {
            setWorkingAccountId("");
        }
    };

    const summary = dashboard?.summary;

    if (isLoading && !dashboard) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <RefreshCw size={18} className="animate-spin" />
                    Loading administration dashboard…
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
                        Administration data unavailable
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">{error}</p>
                    <div className="mt-5 flex justify-center gap-3">
                        <button onClick={refresh} className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">
                            Try again
                        </button>
                        <button onClick={logout} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
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
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-800 text-white">
                        <ShieldCheck size={22} />
                    </span>
                    <div>
                        <p className="font-bold tracking-tight">CampusCare</p>
                        <p className="text-[11px] text-slate-500">System administration</p>
                    </div>
                </div>
                <p className="mb-2 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Workspace
                </p>
                <nav className="space-y-1">
                    {sections.map((section, index) => {
                        const icons = [Activity, Users, Building2];
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
                        <Avatar name={dashboard?.profile?.fullName || user.fullName} variant="purple" />
                        <div className="min-w-0">
                            <p className="truncate text-xs font-bold">{dashboard?.profile?.fullName || user.fullName}</p>
                            <p className="truncate text-[10px] text-slate-500">System administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="lg:ml-64">
                <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-7">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={17} className="text-indigo-700" />
                            <span className="text-sm font-semibold text-slate-700">
                                Institution-wide administration
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
                                <Avatar name={dashboard?.profile?.fullName || user.fullName} size="sm" variant="purple" />
                                <span className="max-w-40 truncate text-xs font-semibold text-slate-700">
                                    {dashboard?.profile?.fullName || user.fullName}
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
                            <button onClick={refresh} className="shrink-0 font-semibold underline">Retry</button>
                        </div>
                    )}
                    {(actionMessage || actionError) && (
                        <div role="status" className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                            actionError
                                ? "border-rose-200 bg-rose-50 text-rose-800"
                                : "border-emerald-200 bg-emerald-50 text-emerald-800"
                        }`}>
                            {actionError || actionMessage}
                        </div>
                    )}

                    {activeSection === "Overview" && (
                        <>
                            <PageHeading
                                eyebrow="System administration"
                                title={`Welcome, ${dashboard?.profile?.fullName?.split(" ")[0] || "Administrator"}`}
                                description="Institution-wide account and department overview."
                            />
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard label="Total accounts" value={summary?.totalAccounts ?? 0} detail="All registered roles" icon={Users} tone="indigo" />
                                <StatCard label="Departments" value={summary?.totalDepartments ?? 0} detail="With institutional accounts" icon={Building2} tone="blue" />
                                <StatCard label="Students" value={summary?.studentCount ?? 0} detail={`${summary?.facultyCount ?? 0} faculty accounts`} icon={GraduationCap} tone="emerald" />
                                <StatCard label="Support sessions" value={summary?.completedSessions ?? 0} detail={`${summary?.appointmentCount ?? 0} appointments total`} icon={Activity} tone="amber" />
                            </div>

                            <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between gap-4">
                                        <div>
                                            <h2 className="font-bold">Department directory</h2>
                                            <p className="mt-1 text-xs text-slate-500">Account counts from current system records</p>
                                        </div>
                                        <button onClick={() => selectSection("Departments")} className="text-xs font-semibold text-indigo-700 hover:text-indigo-900">
                                            View departments
                                        </button>
                                    </div>
                                    <DepartmentTable departments={(dashboard?.departments || []).slice(0, 5)} />
                                </section>
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <h2 className="font-bold">Accounts by role</h2>
                                    <p className="mt-1 text-xs text-slate-500">Current registered accounts</p>
                                    <div className="mt-4 space-y-4">
                                        {accountRoles.map((role) => {
                                            const count = summary?.[`${role}Count`] ?? 0;
                                            const total = summary?.totalAccounts || 0;
                                            const percent = total ? (count / total) * 100 : 0;
                                            return (
                                                <div key={role}>
                                                    <div className="mb-1.5 flex justify-between text-sm">
                                                        <span className="capitalize text-slate-600">{role === "hod" ? "HOD" : role}</span>
                                                        <strong>{count}</strong>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                                        <div className="h-full rounded-full bg-indigo-600" style={{ width: `${percent}%` }} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button
                                        onClick={() => {
                                            selectSection("Accounts");
                                            setIsCreateOpen(true);
                                        }}
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
                                    >
                                        <Plus size={16} /> Create account
                                    </button>
                                </section>
                            </div>
                        </>
                    )}

                    {activeSection === "Accounts" && (
                        <>
                            <PageHeading
                                eyebrow="Identity and access"
                                title="Accounts"
                                description="View registered users or create a student, faculty, HOD, or admin account."
                            >
                                <button
                                    onClick={() => {
                                        setActionMessage("");
                                        setActionError("");
                                        setIsCreateOpen((open) => !open);
                                    }}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
                                >
                                    {isCreateOpen ? <X size={16} /> : <Plus size={16} />}
                                    {isCreateOpen ? "Close form" : "Create account"}
                                </button>
                            </PageHeading>

                            {isCreateOpen && (
                                <form onSubmit={handleCreateAccount} className="mb-5 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
                                    <div className="mb-4">
                                        <h2 className="font-bold">Create account</h2>
                                        <p className="mt-1 text-xs text-slate-500">The user can sign in with the username and password you set.</p>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                        <FormField label="Full name" name="fullName" value={form.fullName} onChange={updateForm} required />
                                        <FormField label="Username" name="username" value={form.username} onChange={updateForm} minLength={3} required />
                                        <FormField label="Temporary password" name="password" type="password" value={form.password} onChange={updateForm} minLength={6} required />
                                        <FormField label="Email" name="email" type="email" value={form.email} onChange={updateForm} />
                                        <label className="block">
                                            <span className="mb-1.5 block text-xs font-semibold text-slate-600">Role</span>
                                            <select name="role" value={form.role} onChange={updateForm} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                                                {accountRoles.map((role) => <option key={role} value={role}>{role === "hod" ? "HOD" : role[0].toUpperCase() + role.slice(1)}</option>)}
                                            </select>
                                        </label>
                                        <FormField label="Department" name="department" value={form.department} onChange={updateForm} list="admin-department-options" required />
                                        <datalist id="admin-department-options">
                                            {(dashboard?.departments || []).map((department) => <option key={department.name} value={department.name} />)}
                                        </datalist>
                                        <FormField label="Identifier (optional)" name="identifier" value={form.identifier} onChange={updateForm} />
                                        {form.role === "teacher" && (
                                            <>
                                                <FormField label="Phone" name="phone" value={form.phone} onChange={updateForm} />
                                                <FormField label="Designation" name="designation" value={form.designation} onChange={updateForm} />
                                                <FormField label="Office" name="office" value={form.office} onChange={updateForm} />
                                                <FormField label="Specialization" name="specialization" value={form.specialization} onChange={updateForm} />
                                                <FormField label="Bio" name="bio" value={form.bio} onChange={updateForm} />
                                            </>
                                        )}
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button disabled={isSaving} type="submit" className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800 disabled:cursor-wait disabled:opacity-60">
                                            {isSaving ? <RefreshCw size={15} className="animate-spin" /> : <Check size={15} />}
                                            {isSaving ? "Creating…" : "Create account"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="mb-4">
                                <SearchBox value={search} onChange={setSearch} placeholder="Search accounts" />
                            </div>
                            <AccountTable
                                users={visibleUsers}
                                onUpdateTeacher={handleUpdateTeacher}
                                onDeleteAccount={handleDeleteAccount}
                                workingAccountId={workingAccountId}
                            />
                        </>
                    )}

                    {activeSection === "Departments" && (
                        <>
                            <PageHeading
                                eyebrow="Institution structure"
                                title="Departments"
                                description="Departments and account coverage derived from registered users."
                            >
                                <SearchBox value={search} onChange={setSearch} placeholder="Search departments" />
                            </PageHeading>
                            <DepartmentTable departments={visibleDepartments} />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

function PageHeading({ eyebrow, title, description, children }) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">{eyebrow}</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
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
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
                    <p className="mt-1 text-xs text-slate-500">{detail}</p>
                </div>
                <span className={`rounded-xl p-2.5 ${tones[tone]}`}><Icon size={20} /></span>
            </div>
        </article>
    );
}

function FormField({ label, name, value, onChange, type = "text", required = false, minLength, list }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                minLength={minLength}
                list={list}
                autoComplete={name === "password" ? "new-password" : "off"}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
            />
        </label>
    );
}

function SearchBox({ value, onChange, placeholder }) {
    return (
        <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-500 shadow-sm sm:w-72">
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

function EmptyState({ children }) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-sm text-slate-500">
            {children}
        </div>
    );
}

function AccountTable({
    users,
    onUpdateTeacher,
    onDeleteAccount,
    workingAccountId,
}) {
    const [editingId, setEditingId] = useState("");
    const [editForm, setEditForm] = useState(null);

    if (!users.length) return <EmptyState>No accounts match your search.</EmptyState>;

    const startEditing = (account) => {
        setEditingId(account.id);
        setEditForm({
            fullName: account.fullName || "",
            email: account.email || "",
            department: account.department || "",
            identifier: account.identifier || "",
            phone: account.phone || "",
            bio: account.bio || "",
            designation: account.designation || "",
            office: account.office || "",
            specialization: account.specialization || "",
        });
    };

    const saveTeacher = async (event, userId) => {
        event.preventDefault();
        const didUpdate = await onUpdateTeacher(userId, editForm);
        if (didUpdate) {
            setEditingId("");
            setEditForm(null);
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Account</th>
                            <th className="px-5 py-3 font-semibold">Role</th>
                            <th className="px-5 py-3 font-semibold">Department</th>
                            <th className="px-5 py-3 font-semibold">Identifier</th>
                            <th className="px-5 py-3 font-semibold">Email</th>
                            <th className="px-5 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((account) => (
                            <Fragment key={account.id}>
                            <tr>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar name={account.fullName} size="sm" variant={account.role === "admin" ? "purple" : "slate"} />
                                        <div>
                                            <p className="font-semibold text-slate-800">{account.fullName}</p>
                                            <p className="mt-0.5 text-xs text-slate-500">@{account.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold capitalize text-indigo-800">
                                        {account.role === "hod" ? "HOD" : account.role}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-600">{account.department || "—"}</td>
                                <td className="px-5 py-4 text-slate-600">{account.identifier || "—"}</td>
                                <td className="px-5 py-4 text-slate-600">{account.email || "—"}</td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        {account.role === "teacher" && (
                                            <button
                                                type="button"
                                                onClick={() => startEditing(account)}
                                                disabled={workingAccountId === account.id}
                                                aria-label={`Edit ${account.fullName}`}
                                                title="Edit teacher information"
                                                className="rounded-lg border border-slate-200 p-2 text-indigo-700 hover:bg-indigo-50 disabled:opacity-50"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                        )}
                                        {account.role !== "admin" && (
                                            <button
                                                type="button"
                                                onClick={() => onDeleteAccount(account)}
                                                disabled={workingAccountId === account.id}
                                                aria-label={`Delete ${account.fullName}`}
                                                title="Delete account"
                                                className="rounded-lg border border-rose-200 p-2 text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                                            >
                                                {workingAccountId === account.id ? (
                                                    <RefreshCw size={15} className="animate-spin" />
                                                ) : (
                                                    <Trash2 size={15} />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            {editingId === account.id && editForm && (
                                <tr className="bg-indigo-50/50">
                                    <td colSpan={6} className="px-5 py-4">
                                        <form
                                            onSubmit={(event) => saveTeacher(event, account.id)}
                                            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                                        >
                                            <label className="text-xs font-semibold text-slate-600">
                                                Full name
                                                <input
                                                    required
                                                    value={editForm.fullName}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            fullName: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Email
                                                <input
                                                    type="email"
                                                    value={editForm.email}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            email: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Department
                                                <input
                                                    required
                                                    value={editForm.department}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            department: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Identifier
                                                <input
                                                    value={editForm.identifier}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            identifier: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Phone
                                                <input
                                                    value={editForm.phone}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            phone: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Designation
                                                <input
                                                    value={editForm.designation}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            designation: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Office
                                                <input
                                                    value={editForm.office}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            office: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <label className="text-xs font-semibold text-slate-600">
                                                Specialization
                                                <input
                                                    value={editForm.specialization}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            specialization: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <label className="text-xs font-semibold text-slate-600 xl:col-span-2">
                                                Bio
                                                <input
                                                    value={editForm.bio}
                                                    onChange={(event) =>
                                                        setEditForm((current) => ({
                                                            ...current,
                                                            bio: event.target.value,
                                                        }))
                                                    }
                                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800"
                                                />
                                            </label>
                                            <div className="flex items-center gap-2 sm:col-span-2 xl:col-span-4">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingId("");
                                                        setEditForm(null);
                                                    }}
                                                    disabled={workingAccountId === account.id}
                                                    className="ml-auto inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-50"
                                                >
                                                    <X size={14} /> Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={workingAccountId === account.id}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-700 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-800 disabled:opacity-50"
                                                >
                                                    {workingAccountId === account.id ? (
                                                        <RefreshCw size={14} className="animate-spin" />
                                                    ) : (
                                                        <Save size={14} />
                                                    )}
                                                    Save changes
                                                </button>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                            )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function DepartmentTable({ departments }) {
    if (!departments.length) return <EmptyState>No department accounts found.</EmptyState>;
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Department</th>
                            <th className="px-5 py-3 font-semibold">Students</th>
                            <th className="px-5 py-3 font-semibold">Faculty</th>
                            <th className="px-5 py-3 font-semibold">HODs</th>
                            <th className="px-5 py-3 font-semibold">Coverage</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {departments.map((department) => (
                            <tr key={department.name}>
                                <td className="px-5 py-4 font-semibold text-slate-800">{department.name}</td>
                                <td className="px-5 py-4">{department.students}</td>
                                <td className="px-5 py-4">{department.faculty}</td>
                                <td className="px-5 py-4">{department.hods}</td>
                                <td className="px-5 py-4">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                        department.hods > 0
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-amber-50 text-amber-800"
                                    }`}>
                                        {department.hods > 0 ? "HOD assigned" : "No HOD"}
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
