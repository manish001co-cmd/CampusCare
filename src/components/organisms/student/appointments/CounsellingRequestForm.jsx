import CounsellingTypeSelector from "./form/CounsellingTypeSelector";
import CounsellorField from "./form/CounsellorField";
import ConsultationTopicField from "./form/ConsultationTopicField";
import AppointmentScheduleFields from "./form/AppointmentScheduleFields";
import AppointmentNotesField from "./form/AppointmentNotesField";
import AppointmentFormActions from "./form/AppointmentFormActions";

export default function CounsellingRequestForm({
    bookingForm,
    setBookingForm,
    mentorList,
    onSubmit,
    onClose,
}) {
    const updateField = (field, value) =>
        setBookingForm((current) => ({ ...current, [field]: value }));

    return (
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <CounsellingTypeSelector
                value={bookingForm.type}
                onChange={(value) => updateField("type", value)}
            />
            <CounsellorField
                value={bookingForm.counsellorName}
                mentors={mentorList}
                onChange={(value) => updateField("counsellorName", value)}
            />
            <ConsultationTopicField
                value={bookingForm.title}
                onChange={(value) => updateField("title", value)}
            />
            <AppointmentScheduleFields
                date={bookingForm.date}
                time={bookingForm.time}
                onDateChange={(value) => updateField("date", value)}
                onTimeChange={(value) => updateField("time", value)}
            />
            <AppointmentNotesField
                value={bookingForm.notes}
                onChange={(value) => updateField("notes", value)}
            />
            <AppointmentFormActions onCancel={onClose} />
        </form>
    );
}
