import AppointmentCard from "./AppointmentCard";
import EmptyAppointmentState from "./EmptyAppointmentState";

export default function AppointmentList({ appointments, status, onRequestNew }) {
    return (
        <div className="mt-5 space-y-4">
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <AppointmentCard key={appointment._id} appointment={appointment} />
                ))
            ) : (
                <EmptyAppointmentState
                    status={status}
                    onRequestNew={onRequestNew}
                />
            )}
        </div>
    );
}
