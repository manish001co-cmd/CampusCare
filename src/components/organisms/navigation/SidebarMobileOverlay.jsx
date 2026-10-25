export default function SidebarMobileOverlay({ onClose }) {
    return (
        <button
            type="button"
            aria-label="Close sidebar overlay"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
    );
}
