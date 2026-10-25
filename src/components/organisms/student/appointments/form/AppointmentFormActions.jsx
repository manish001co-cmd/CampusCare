import Button from "../../../../atoms/Button";

export default function AppointmentFormActions({ onCancel }) {
    return (
        <div className="mt-5 flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
                Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
                Submit Request
            </Button>
        </div>
    );
}
