import AppointmentRequestsHeader from "./AppointmentRequestsHeader";
import PendingRequestsSection from "./sections/PendingRequestsSection";
import HandledRequestsSection from "./sections/HandledRequestsSection";

export default function TeacherAppointmentsView({ requests, onAction }) {
    const pendingRequests = requests.filter((request) => request.status === "New");
    const handledRequests = requests.filter((request) => request.status !== "New");

    return (
        <main className="p-8 max-w-5xl">
            <AppointmentRequestsHeader pendingCount={pendingRequests.length} />
            <PendingRequestsSection
                requests={pendingRequests}
                onAction={onAction}
            />
            <HandledRequestsSection
                requests={handledRequests}
                onAction={onAction}
            />
        </main>
    );
}
