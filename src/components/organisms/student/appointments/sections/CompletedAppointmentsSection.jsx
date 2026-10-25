import AppointmentList from "../AppointmentList";

export default function CompletedAppointmentsSection({ appointments, onRequestNew }) {
    return (
        <AppointmentList
            appointments={appointments.filter((item) => item.status === "Completed")}
            status="Completed"
            onRequestNew={onRequestNew}
        />
    );
}
