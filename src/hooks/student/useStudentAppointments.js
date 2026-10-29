import { useState } from "react";

function createInitialBookingForm(mentor) {
    return {
        counsellorName: mentor || "",
        type: "academic",
        title: "",
        date: "",
        time: "",
        location: "",
        notes: "",
    };
}

async function readResponse(response) {
    const body = await response.text();
    let data;
    try {
        data = JSON.parse(body);
    } catch {
        throw new Error(
            `The student API returned an invalid response (HTTP ${response.status}).`
        );
    }

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit the appointment.");
    }
    return data;
}

export default function useStudentAppointments(mentor) {
    const [appointments, setAppointments] = useState([]);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingSuccessMsg, setBookingSuccessMsg] = useState("");
    const [error, setError] = useState("");
    const [bookingForm, setBookingForm] = useState(() =>
        createInitialBookingForm(mentor)
    );

    const handleBookingSubmit = async (event) => {
        event.preventDefault();
        setBookingSuccessMsg("");
        setError("");

        if (!bookingForm.title.trim() || !bookingForm.date || !bookingForm.time) {
            setError("Enter an appointment title, date, and time.");
            return;
        }

        const token = localStorage.getItem("campuscare_token");
        if (!token) {
            setError("Your session has expired. Please sign in again.");
            return;
        }

        try {
            const response = await fetch("/api/student/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bookingForm),
            });
            const data = await readResponse(response);
            setAppointments((current) => [data.appointment, ...current]);
            setBookingSuccessMsg(data.message);
            setTimeout(() => {
                setBookingSuccessMsg("");
                setIsBookingOpen(false);
                setBookingForm(createInitialBookingForm(mentor));
            }, 1500);
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to submit the appointment."
            );
        }
    };

    const openBookingForMentor = () => {
        setIsBookingOpen(true);
        setBookingForm((current) => ({
            ...current,
            counsellorName: mentor || current.counsellorName,
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
        error,
        handleBookingSubmit,
        openBookingForMentor,
    };
}
