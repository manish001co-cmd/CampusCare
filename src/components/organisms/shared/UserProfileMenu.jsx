import { useEffect, useRef, useState } from "react";
import {
    Building,
    Check,
    ChevronDown,
    GraduationCap,
    HeartHandshake,
    LogOut,
    Mail,
    Phone,
    RefreshCw,
    ShieldCheck,
    Sparkles,
    User,
    X,
} from "lucide-react";
import Avatar from "../../atoms/Avatar";

export default function UserProfileMenu({
    user,
    onLogout,
    onProfileUpdated,
    accent = "indigo",
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const roleLabel = {
        admin: "System Administrator",
        hod: "Head of Department",
        teacher: "Faculty Mentor",
        student: "Student",
    }[user?.role?.toLowerCase()] || user?.role || "User";

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/90 px-3 py-1.5 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
            >
                <Avatar
                    name={user?.fullName || "User"}
                    size="sm"
                    variant={
                        user?.role === "admin"
                            ? "purple"
                            : user?.role === "hod"
                            ? "purple"
                            : user?.role === "teacher"
                            ? "blue"
                            : "emerald"
                    }
                />
                <div className="hidden text-left sm:block">
                    <p className="max-w-44 truncate text-xs font-bold leading-tight text-slate-800">
                        {user?.fullName || "User"}
                    </p>
                    <p className="text-[10px] font-medium text-slate-500">
                        {roleLabel}
                    </p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
            </button>

            {isMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl">
                    <div className="border-b border-slate-100 px-4 py-2 sm:hidden">
                        <p className="truncate text-xs font-bold text-slate-800">
                            {user?.fullName}
                        </p>
                        <p className="text-[10px] text-slate-500">{roleLabel}</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setIsMenuOpen(false);
                            setIsModalOpen(true);
                        }}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        <User size={15} className="text-slate-500" />
                        Profile Settings
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                        type="button"
                        onClick={() => {
                            setIsMenuOpen(false);
                            onLogout?.();
                        }}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                        <LogOut size={15} />
                        Logout
                    </button>
                </div>
            )}

            {isModalOpen && (
                <ProfileModal
                    user={user}
                    onClose={() => setIsModalOpen(false)}
                    onProfileUpdated={(updated) => {
                        onProfileUpdated?.(updated);
                    }}
                    roleLabel={roleLabel}
                    accent={accent}
                />
            )}
        </div>
    );
}

function ProfileModal({ user, onClose, onProfileUpdated, roleLabel, accent }) {
    const [form, setForm] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
        office: user?.office || "",
        designation: user?.designation || "",
        specialization: user?.specialization || "",
        emergencyContact: user?.emergencyContact || "",
        preferredMode: user?.preferredMode || "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!form.fullName.trim()) {
            setError("Full name cannot be empty.");
            return;
        }

        setIsSaving(true);
        try {
            const token = localStorage.getItem("campuscare_token");
            const response = await fetch("/api/auth/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to update profile.");
            }

            // Sync localStorage
            const stored = JSON.parse(localStorage.getItem("campuscare_user") || "{}");
            const merged = { ...stored, ...data.user };
            localStorage.setItem("campuscare_user", JSON.stringify(merged));

            setMessage("Profile updated successfully!");
            onProfileUpdated?.(data.user);

            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    const isTeacher = user?.role === "teacher";
    const isHod = user?.role === "hod";
    const isStudent = user?.role === "student";

    const accentBg = {
        indigo: "bg-indigo-700 hover:bg-indigo-800",
        emerald: "bg-emerald-700 hover:bg-emerald-800",
        blue: "bg-blue-700 hover:bg-blue-800",
    }[accent] || "bg-indigo-700 hover:bg-indigo-800";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Edit Profile</h2>
                        <p className="text-xs text-slate-500">
                            Update your personal information for your CampusCare account.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                {message && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                        <Check size={16} />
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mt-4 rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-800 border border-rose-200">
                        {error}
                    </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 p-3 border border-slate-100 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Account:</span>
                    <span className="rounded-lg bg-white px-2 py-0.5 border border-slate-200 text-slate-800 font-mono text-[11px]">
                        @{user?.username}
                    </span>
                    <span className="rounded-lg bg-indigo-50 px-2 py-0.5 border border-indigo-100 font-semibold text-indigo-700 text-[11px]">
                        {roleLabel}
                    </span>
                    {user?.identifier && (
                        <span className="rounded-lg bg-white px-2 py-0.5 border border-slate-200 text-slate-700 text-[11px]">
                            ID: {user?.identifier}
                        </span>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-700">
                            Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="name@campuscare.edu"
                                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 00000"
                                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>

                    {(isTeacher || isHod) && (
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-slate-700">
                                    Office Location
                                </label>
                                <input
                                    type="text"
                                    name="office"
                                    value={form.office}
                                    onChange={handleChange}
                                    placeholder="e.g. Room 2B, CSE Wing"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-slate-700">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={form.designation}
                                    onChange={handleChange}
                                    placeholder="e.g. Associate Professor"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>
                    )}

                    {isTeacher && (
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-700">
                                Specialization
                            </label>
                            <input
                                type="text"
                                name="specialization"
                                value={form.specialization}
                                onChange={handleChange}
                                placeholder="e.g. Algorithms, student advising"
                                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    )}

                    {isStudent && (
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-slate-700">
                                    Emergency Contact
                                </label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    value={form.emergencyContact}
                                    onChange={handleChange}
                                    placeholder="Guardian phone number"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-slate-700">
                                    Preferred Meeting Mode
                                </label>
                                <input
                                    type="text"
                                    name="preferredMode"
                                    value={form.preferredMode}
                                    onChange={handleChange}
                                    placeholder="In-Person or Virtual"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-700">
                            Bio & Notes
                        </label>
                        <textarea
                            rows={3}
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Write a brief bio or description..."
                            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-sm disabled:opacity-60 ${accentBg}`}
                        >
                            {isSaving ? (
                                <RefreshCw size={13} className="animate-spin" />
                            ) : (
                                <Check size={13} />
                            )}
                            {isSaving ? "Saving…" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

