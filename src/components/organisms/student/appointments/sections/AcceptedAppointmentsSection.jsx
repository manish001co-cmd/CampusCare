import AppointmentList from "../AppointmentList";

export default function AcceptedAppointmentsSection({ appointments, onRequestNew }) {
    return (
        <AppointmentList
            appointments={appointments.filter((item) => item.status === "Accepted")}
            status="Accepted"
            onRequestNew={onRequestNew}
        />
    );
}
