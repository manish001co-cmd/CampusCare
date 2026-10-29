import AppointmentModalHeader from "./AppointmentModalHeader";
import AppointmentSuccessMessage from "./AppointmentSuccessMessage";
import CounsellingRequestForm from "./CounsellingRequestForm";

export default function AppointmentModal({
    isOpen,
    onClose,
    bookingForm,
    setBookingForm,
    onSubmit,
    successMsg,
    mentorList = [],
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm animate-fade-in">
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="appointment-modal-title"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            >
                <AppointmentModalHeader onClose={onClose} />
                {successMsg ? (
                    <AppointmentSuccessMessage message={successMsg} />
                ) : (
                    <CounsellingRequestForm
                        bookingForm={bookingForm}
                        setBookingForm={setBookingForm}
                        mentorList={mentorList}
                        onSubmit={onSubmit}
                        onClose={onClose}
                    />
                )}
            </section>
        </div>
    );
}
