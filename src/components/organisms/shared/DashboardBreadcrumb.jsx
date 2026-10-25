export default function DashboardBreadcrumb({ section }) {
    return (
        <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">CampusCare</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">{section}</span>
        </div>
    );
}
