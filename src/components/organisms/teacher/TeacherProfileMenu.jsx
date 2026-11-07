import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import Avatar from "../../atoms/Avatar";

export default function TeacherProfileMenu({ teacher, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", closeOnOutsideClick);
        return () => document.removeEventListener("mousedown", closeOnOutsideClick);
    }, []);

    const handleOpenProfile = () => {
        setIsOpen(false);
        setIsModalOpen(true);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                className="flex items-center gap-2 rounded-xl border border-[#d0e3f8] bg-white/80 px-3 py-1.5 shadow-sm transition hover:bg-blue-50"
            >
                <Avatar name={teacher?.fullName || "Teacher"} size="sm" />
                <div className="hidden text-left sm:block">
                    <p className="text-[11px] font-bold leading-tight text-slate-800">
                        {teacher?.fullName || "Teacher"}
                    </p>
                    <p className="text-[9px] text-slate-500">
                        {teacher?.designation || teacher?.department || "Faculty"}
                    </p>
                </div>
                <ChevronDown size={12} className="text-slate-400" />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white py-1 shadow-xl">
                    <button
                        type="button"
                        onClick={handleOpenProfile}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[12px] text-slate-700 hover:bg-slate-50"
                    >
                        <User size={13} />
                        Profile
                    </button>
                    <div className="mt-1 border-t border-slate-100 pt-1">
                        <button
                            type="button"
                            onClick={onLogout}
                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold text-rose-600 hover:bg-rose-50"
                        >
                            <LogOut size={13} />
                            Logout
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <ProfileModal
                    teacher={teacher}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

function ProfileModal({ teacher, onClose }) {
    const [form, setForm] = useState({
        fullName: teacher?.fullName || "",
        email: teacher?.email || "",
        phone: teacher?.phone || "",
        bio: teacher?.bio || "",
        office: teacher?.office || "",
        designation: teacher?.designation || "",
        specialization: teacher?.specialization || "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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

            const stored = JSON.parse(localStorage.getItem("campuscare_user") || "{}");
            localStorage.setItem(
                "campuscare_user",
                JSON.stringify({ ...stored, ...data.user })
            );
            setMessage("Profile updated successfully!");
            setTimeout(() => onClose(), 800);
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to update profile."
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Edit profile</h2>
                        <p className="text-xs text-slate-500">Update your faculty profile information.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-xs font-semibold text-slate-600">
                            Full name
                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
                            />
                        </label>
                        <label className="text-xs font-semibold text-slate-600">
                            Email
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
                            />
                        </label>
                        <label className="text-xs font-semibold text-slate-600">
                            Phone
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
                            />
                        </label>
                        <label className="text-xs font-semibold text-slate-600">
                            Designation
                            <input
                                name="designation"
                                value={form.designation}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
                            />
                        </label>
                        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
                            Office
                            <input
                                name="office"
                                value={form.office}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
                            />
                        </label>
                        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
                            Specialization
                            <input
                                name="specialization"
                                value={form.specialization}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
                            />
                        </label>
                        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
                            Bio
                            <textarea
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
                            />
                        </label>
                    </div>

                    {message && (
                        <p className="text-sm font-medium text-emerald-700">{message}</p>
                    )}
                    {error && (
                        <p className="text-sm font-medium text-rose-700">{error}</p>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
                        >
                            {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
