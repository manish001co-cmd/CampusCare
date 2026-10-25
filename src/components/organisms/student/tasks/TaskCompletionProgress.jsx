export default function TaskCompletionProgress({ progressPercent }) {
    return (
        <section className="mb-6 rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Completion Progress</span>
                <span>{progressPercent}%</span>
            </div>
            <div
                className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Task completion progress"
            >
                <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </section>
    );
}
