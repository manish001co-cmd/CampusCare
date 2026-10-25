import roleNavigation from "./organisms/navigation/roleNavigation";
import SidebarMobileOverlay from "./organisms/navigation/SidebarMobileOverlay";
import SidebarBrand from "./organisms/navigation/SidebarBrand";
import SidebarNavigation from "./organisms/navigation/SidebarNavigation";
import SidebarLogout from "./organisms/navigation/SidebarLogout";

export default function Sidebar({
    role,
    activePage,
    onNavigate,
    onLogout,
    mobileOpen,
    setMobileOpen,
}) {
    const config = roleNavigation[role];
    if (!config) {
        throw new Error(`Unsupported sidebar role: ${role}`);
    }

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            {mobileOpen && <SidebarMobileOverlay onClose={closeMobile} />}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-200 lg:translate-x-0 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <SidebarBrand
                    title={config.title}
                    icon={config.icon}
                    onCloseMobile={closeMobile}
                />
                <SidebarNavigation
                    items={config.menu}
                    activePage={activePage}
                    onNavigate={onNavigate}
                    onCloseMobile={closeMobile}
                />
                <SidebarLogout onLogout={onLogout} />
            </aside>
        </>
    );
}
