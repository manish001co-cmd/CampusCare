import AppointmentCardHeader from "./AppointmentCardHeader";

export default function NoUpcomingAppointment() {
    return (
        <section className="rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <AppointmentCardHeader />
            <p className="mt-4 text-xs text-slate-500">
                No upcoming appointments scheduled.
            </p>
        </section>
    );
}
