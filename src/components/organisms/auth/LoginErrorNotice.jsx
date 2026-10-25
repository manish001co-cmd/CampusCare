export default function LoginErrorNotice({ message }) {
    if (!message) return null;

    return (
        <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs leading-normal text-red-700"
        >
            {message}
        </div>
    );
}
