import { CheckCircle2 } from "lucide-react";

export default function AppointmentSuccessMessage({ message }) {
    return (
        <div className="my-8 text-center">
            <CheckCircle2 size={42} className="mx-auto text-emerald-600" />
            <h3 className="mt-3 text-base font-bold text-slate-900">
                Request Submitted!
            </h3>
            <p className="mt-1 text-xs text-slate-500">{message}</p>
        </div>
    );
}
