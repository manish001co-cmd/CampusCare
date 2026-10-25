export default function GreetingSection({ fullName }) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Good morning, {fullName.split(" ")[0]}
            </h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Your wellbeing and support plan, all in one place.
            </p>
        </div>
    );
}
