import TeacherProfileHeader from "./TeacherProfileHeader";
import TeacherIdentityCard from "./TeacherIdentityCard";
import TeacherProfileDetails from "./TeacherProfileDetails";
import TeacherProfileBio from "./TeacherProfileBio";

export default function TeacherProfileView({ teacher }) {
    return (
        <main className="p-8 max-w-3xl">
            <TeacherProfileHeader />
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <TeacherIdentityCard teacher={teacher} />
                <TeacherProfileDetails teacher={teacher} />
                <TeacherProfileBio bio={teacher.bio} />
            </section>
        </main>
    );
}
