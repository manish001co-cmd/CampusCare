export default function AppointmentRequestsHeader({ pendingCount }) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Appointment Requests
            </h1>
            <p className="mt-1 text-xs text-slate-500">
                {pendingCount} new request{pendingCount !== 1 ? "s" : ""} awaiting
                your response. Personal/mental wellbeing sessions are marked
                confidential.
            </p>
        </div>
    );
}
