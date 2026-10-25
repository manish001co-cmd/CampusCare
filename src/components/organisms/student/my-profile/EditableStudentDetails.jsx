import { Save } from "lucide-react";
import Button from "../../../atoms/Button";
import ProfileTextField from "./ProfileTextField";
import ProfileModeField from "./ProfileModeField";
import ProfileBioField from "./ProfileBioField";

export default function EditableStudentDetails({ profileEdit, setProfileEdit }) {
    const updateField = (field, value) =>
        setProfileEdit((current) => ({ ...current, [field]: value }));

    return (
        <section className="rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <h2 className="border-b border-slate-100 pb-3 text-sm font-bold text-slate-800">
                Permitted Student Details (Editable)
            </h2>
            <div className="mt-4 space-y-4">
                <ProfileTextField
                    label="Phone Number"
                    value={profileEdit.phone}
                    placeholder="+91 98765 43210"
                    onChange={(value) => updateField("phone", value)}
                />
                <ProfileTextField
                    label="Emergency Contact"
                    value={profileEdit.emergencyContact}
                    placeholder="+91 98765 01234 (Guardian)"
                    onChange={(value) => updateField("emergencyContact", value)}
                />
                <ProfileModeField
                    value={profileEdit.preferredMode}
                    onChange={(value) => updateField("preferredMode", value)}
                />
                <ProfileBioField
                    value={profileEdit.bio}
                    onChange={(value) => updateField("bio", value)}
                />
            </div>
            <div className="mt-6 flex justify-end">
                <Button type="submit" variant="primary" size="md">
                    <Save size={15} />
                    <span>Save Changes</span>
                </Button>
            </div>
        </section>
    );
}
