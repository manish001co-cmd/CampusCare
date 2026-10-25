import AppointmentList from "../AppointmentList";

export default function AllAppointmentsSection({ appointments, onRequestNew }) {
    return (
        <AppointmentList
            appointments={appointments}
            status="All"
            onRequestNew={onRequestNew}
        />
    );
}
