import { User } from "lucide-react";
import Input from "../../atoms/Input";

export default function UsernameField({ value, onChange }) {
    return (
        <div>
            <label
                htmlFor="username"
                className="mb-1 block text-xs font-semibold text-slate-700"
            >
                Username
            </label>
            <Input
                id="username"
                name="username"
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Enter your username (e.g. student)"
                autoComplete="username"
                required
                icon={User}
            />
        </div>
    );
}
