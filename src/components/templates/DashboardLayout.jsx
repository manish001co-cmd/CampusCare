export default function DashboardLayout({
    
    sidebar,
    header,
    children,
}) {
    return (
        <div className="flex min-h-screen bg-[#faf9f5] text-slate-800">
            {/* Sidebar */}
            {sidebar}

            {/* Main Area */}
            <div className="ml-64 flex flex-1 flex-col">
                {header}
                {children}
            </div>
        </div>
    );
}
