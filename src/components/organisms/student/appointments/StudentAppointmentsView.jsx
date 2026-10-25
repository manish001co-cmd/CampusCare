import AppointmentPageHeader from "./AppointmentPageHeader";
import AppointmentStatusTabs from "./AppointmentStatusTabs";
import AppointmentStatusSection from "./AppointmentStatusSection";

export default function StudentAppointmentsView({
    appointments = [],
    statusFilter,
    setStatusFilter,
    onRequestNew,
}) {
    return (
        <main className="p-8 max-w-5xl">
            <AppointmentPageHeader onRequestNew={onRequestNew} />
            <AppointmentStatusTabs
                activeStatus={statusFilter}
                onSelectStatus={setStatusFilter}
            />
            <AppointmentStatusSection
                status={statusFilter}
                appointments={appointments}
                onRequestNew={onRequestNew}
            />
        </main>
    );
}
