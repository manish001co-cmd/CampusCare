import StudentProfileHeader from "./StudentProfileHeader";
import ProfileSaveNotice from "./ProfileSaveNotice";
import OfficialAcademicInfo from "./OfficialAcademicInfo";
import EditableStudentDetails from "./EditableStudentDetails";

export default function StudentProfileView({
    profile,
    profileEdit,
    setProfileEdit,
    onSaveProfile,
    saveMsg,
}) {
    return (
        <main className="p-8 max-w-4xl">
            <StudentProfileHeader />
            <ProfileSaveNotice message={saveMsg} />
            <form onSubmit={onSaveProfile} className="space-y-6">
                <OfficialAcademicInfo profile={profile} />
                <EditableStudentDetails
                    profileEdit={profileEdit}
                    setProfileEdit={setProfileEdit}
                />
            </form>
        </main>
    );
}
