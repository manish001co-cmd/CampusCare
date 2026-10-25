import AppointmentList from "../AppointmentList";

export default function PendingAppointmentsSection({ appointments, onRequestNew }) {
    return (
        <AppointmentList
            appointments={appointments.filter((item) => item.status === "Pending")}
            status="Pending"
            onRequestNew={onRequestNew}
        />
    );
}
