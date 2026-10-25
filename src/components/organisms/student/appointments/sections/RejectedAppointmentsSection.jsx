import AppointmentList from "../AppointmentList";

export default function RejectedAppointmentsSection({ appointments, onRequestNew }) {
    return (
        <AppointmentList
            appointments={appointments.filter((item) => item.status === "Rejected")}
            status="Rejected"
            onRequestNew={onRequestNew}
        />
    );
}
