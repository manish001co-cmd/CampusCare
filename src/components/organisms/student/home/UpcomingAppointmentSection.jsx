import AppointmentCardHeader from "./AppointmentCardHeader";
import UpcomingAppointmentDetails from "./UpcomingAppointmentDetails";
import UpcomingAppointmentActions from "./UpcomingAppointmentActions";
import NoUpcomingAppointment from "./NoUpcomingAppointment";

export default function UpcomingAppointmentSection({
    appointment,
    onViewAll,
    onReschedule,
    onViewDetails,
}) {
    if (!appointment) return <NoUpcomingAppointment />;

    return (
        <section className="rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <AppointmentCardHeader onViewAll={onViewAll} />
            <UpcomingAppointmentDetails appointment={appointment} />
            <UpcomingAppointmentActions
                onReschedule={onReschedule}
                onViewDetails={onViewDetails}
            />
        </section>
    );
}
