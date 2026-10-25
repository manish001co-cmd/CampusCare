import AllAppointmentsSection from "./sections/AllAppointmentsSection";
import PendingAppointmentsSection from "./sections/PendingAppointmentsSection";
import AcceptedAppointmentsSection from "./sections/AcceptedAppointmentsSection";
import CompletedAppointmentsSection from "./sections/CompletedAppointmentsSection";
import RejectedAppointmentsSection from "./sections/RejectedAppointmentsSection";

const statusSections = {
    All: AllAppointmentsSection,
    Pending: PendingAppointmentsSection,
    Accepted: AcceptedAppointmentsSection,
    Completed: CompletedAppointmentsSection,
    Rejected: RejectedAppointmentsSection,
};

export default function AppointmentStatusSection({
    status,
    appointments,
    onRequestNew,
}) {
    const Section = statusSections[status] || AllAppointmentsSection;

    return (
        <Section
            appointments={appointments}
            onRequestNew={onRequestNew}
        />
    );
}
