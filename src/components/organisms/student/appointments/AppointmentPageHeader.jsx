import { Plus } from "lucide-react";
import Button from "../../../atoms/Button";

export default function AppointmentPageHeader({ onRequestNew }) {
    return (
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Counselling Appointments
                </h1>
                <p className="mt-1 text-xs text-slate-500">
                    Request and track appointments across Academic, Career, and Personal counselling.
                </p>
            </div>
            <Button variant="primary" size="md" onClick={onRequestNew}>
                <Plus size={16} />
                <span>Request Appointment</span>
            </Button>
        </div>
    );
}
