export default function SupportPlanHeader({ onManageTasks }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold text-slate-900">My support plan</h2>
            {onManageTasks && (
                <button
                    type="button"
                    onClick={onManageTasks}
                    className="text-xs font-medium text-[#0f4437] hover:underline"
                >
                    Manage tasks
                </button>
            )}
        </div>
    );
}
