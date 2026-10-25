import { Calendar } from "lucide-react";
import Button from "../../../atoms/Button";

export default function EmptyAppointmentState({ status, onRequestNew }) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
            <Calendar size={32} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm font-semibold">No appointments found</p>
            <p className="mt-1 text-xs text-slate-400">
                No sessions matching "{status}". Click below to request a new session.
            </p>
            <Button
                variant="primary"
                size="md"
                onClick={onRequestNew}
                className="mt-4"
            >
                + Request counselling
            </Button>
        </div>
    );
}
