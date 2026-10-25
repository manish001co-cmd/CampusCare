import { useState } from "react";
import { studentRoleData } from "../../data/roles/Students";

function createInitialBookingForm(mentor) {
    return {
        counsellorName: mentor,
        type: "academic",
        title: "",
        date: "2026-11-02",
        time: "11:00 AM - 11:45 AM",
        location: "Counselling Room 2B",
        notes: "",
    };
}

export default function useStudentAppointments(mentor) {
    const [appointments, setAppointments] = useState(
        studentRoleData.appointments
    );
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingSuccessMsg, setBookingSuccessMsg] = useState("");
    const [bookingForm, setBookingForm] = useState(() =>
        createInitialBookingForm(mentor)
    );

    const handleBookingSubmit = async (event) => {
        event.preventDefault();
        if (!bookingForm.title.trim()) return;

        const newAppointment = {
            _id: `apt-${Date.now()}`,
            ...bookingForm,
            status: "Pending",
        };

        setAppointments((current) => [newAppointment, ...current]);

        const token = localStorage.getItem("campuscare_token");
        if (token) {
            try {
                const response = await fetch("/api/student/appointments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(bookingForm),
                });
                const data = await response.json();
                if (data.success && data.appointment) {
                    setAppointments((current) =>
                        current.map((appointment) =>
                            appointment._id === newAppointment._id
                                ? data.appointment
                                : appointment
                        )
                    );
                }
            } catch (error) {
                console.log("Appointment saved locally in state:", error);
            }
        }

        setBookingSuccessMsg(
            "Your counselling appointment request was submitted successfully!"
        );
        setTimeout(() => {
            setBookingSuccessMsg("");
            setIsBookingOpen(false);
            setBookingForm(createInitialBookingForm(mentor));
        }, 1500);
    };

    const openBookingForMentor = () => {
        setIsBookingOpen(true);
        setBookingForm((current) => ({
            ...current,
            counsellorName: mentor,
        }));
    };

    return {
        appointments,
        setAppointments,
        isBookingOpen,
        setIsBookingOpen,
        bookingSuccessMsg,
        bookingForm,
        setBookingForm,
        handleBookingSubmit,
        openBookingForMentor,
    };
}
