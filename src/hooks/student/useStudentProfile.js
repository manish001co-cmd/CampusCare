import { useState } from "react";
import { studentRoleData } from "../../data/roles/Students";

export default function useStudentProfile() {
    const [profile, setProfile] = useState(studentRoleData.profile);
    const [profileEdit, setProfileEdit] = useState({
        ...studentRoleData.profile,
    });
    const [profileSaveMsg, setProfileSaveMsg] = useState("");

    const handleSaveProfile = async (event) => {
        event.preventDefault();
        setProfile((current) => ({ ...current, ...profileEdit }));

        const token = localStorage.getItem("campuscare_token");
        if (token) {
            try {
                await fetch("/api/student/profile", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        phone: profileEdit.phone,
                        emergencyContact: profileEdit.emergencyContact,
                        preferredMode: profileEdit.preferredMode,
                        bio: profileEdit.bio,
                    }),
                });
            } catch (error) {
                console.log("Profile saved locally:", error);
            }
        }

        setProfileSaveMsg("Profile details updated successfully!");
        setTimeout(() => setProfileSaveMsg(""), 3000);
    };

    return {
        profile,
        setProfile,
        profileEdit,
        setProfileEdit,
        profileSaveMsg,
        setProfileSaveMsg,
        handleSaveProfile,
    };
}
