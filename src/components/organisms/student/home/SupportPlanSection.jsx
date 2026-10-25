import SupportPlanHeader from "./SupportPlanHeader";
import SupportPlanTaskList from "./SupportPlanTaskList";

export default function SupportPlanSection({
    tasks = [],
    onToggleTask,
    onManageTasks,
}) {
    return (
        <section className="rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <SupportPlanHeader onManageTasks={onManageTasks} />
            <SupportPlanTaskList
                tasks={tasks.slice(0, 3)}
                onToggleTask={onToggleTask}
            />
        </section>
    );
}
