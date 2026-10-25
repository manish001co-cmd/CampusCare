import RoleCard from "../../molecules/RoleCard";

export default function RoleSelector({
    roles,
    selectedRole,
    onSelectRole,
}) {
    return (
        <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                    Select your role
                </label>
                <span className="text-[11px] text-slate-400">
                    Quick click below to fill demo
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                    <RoleCard
                        key={role.value}
                        role={role}
                        selected={selectedRole === role.value}
                        onClick={() => onSelectRole(role.value)}
                    />
                ))}
            </div>
        </div>
    );
}
