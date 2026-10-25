import { Plus } from "lucide-react";

export default function TaskManagementHeader({
    pendingCount,
    completedCount,
    onToggleForm,
}) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Task Management
                </h1>
                <p className="mt-1 text-xs text-slate-500">
                    {pendingCount} pending · {completedCount} completed
                </p>
            </div>
            <button
                type="button"
                onClick={onToggleForm}
                className="flex items-center gap-2 rounded-xl bg-[#0f3460] px-4 py-2 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#1a4a7a]"
            >
                <Plus size={13} />
                Assign New Task
            </button>
        </div>
    );
}
