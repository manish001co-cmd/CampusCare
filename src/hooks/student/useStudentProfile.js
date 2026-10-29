import { useState } from "react";

const emptyProfile = {
    fullName: "",
    username: "",
    email: "",
    department: "",
    identifier: "",
    semester: "",
    phone: "",
    emergencyContact: "",
    preferredMode: "",
    bio: "",
    mentor: "",
    mentorEmail: "",
    mentorRole: "",
    mentorOffice: "",
};

async function readResponse(response) {
    const body = await response.text();
    let data;
    try {
        data = JSON.parse(body);
    } catch {
        throw new Error(
            `The student API returned an invalid response (HTTP ${response.status}).`
        );
    }

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update your profile.");
    }
    return data;
}

export default function useStudentProfile() {
    const [profile, setProfile] = useState(emptyProfile);
    const [profileEdit, setProfileEdit] = useState(emptyProfile);
    const [profileSaveMsg, setProfileSaveMsg] = useState("");
    const [error, setError] = useState("");

    const handleSaveProfile = async (event) => {
        event.preventDefault();
        setProfileSaveMsg("");
        setError("");

        const token = localStorage.getItem("campuscare_token");
        if (!token) {
            setError("Your session has expired. Please sign in again.");
            return;
        }

        try {
            const response = await fetch("/api/student/profile", {
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
            await readResponse(response);
            setProfile((current) => ({ ...current, ...profileEdit }));
            setProfileSaveMsg("Profile details updated successfully.");
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to update your profile."
            );
        }
    };

    return {
        profile,
        setProfile,
        profileEdit,
        setProfileEdit,
        profileSaveMsg,
        setProfileSaveMsg,
        error,
        handleSaveProfile,
    };
}
