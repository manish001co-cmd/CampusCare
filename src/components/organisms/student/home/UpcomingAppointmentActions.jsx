import Button from "../../../atoms/Button";

export default function UpcomingAppointmentActions({
    onReschedule,
    onViewDetails,
}) {
    return (
        <div className="mt-6 flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={onReschedule}>
                Reschedule
            </Button>
            <Button variant="primary" size="sm" onClick={onViewDetails}>
                View appointment
            </Button>
        </div>
    );
}
