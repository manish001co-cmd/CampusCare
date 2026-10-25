import { ShieldCheck } from "lucide-react";

export default function LoginHeroSecurity() {
    return (
        <div className="relative flex items-center gap-2 text-xs text-blue-200/70">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>MongoDB Atlas Secured · Role-Based RBAC</span>
        </div>
    );
}
