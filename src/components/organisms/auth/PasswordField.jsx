import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import Input from "../../atoms/Input";

export default function PasswordField({ value, onChange }) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <label
                htmlFor="password"
                className="mb-1 block text-xs font-semibold text-slate-700"
            >
                Password
            </label>
            <Input
                id="password"
                name="password"
                type={visible ? "text" : "password"}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                icon={LockKeyhole}
                rightElement={
                    <button
                        type="button"
                        onClick={() => setVisible((current) => !current)}
                        aria-label={visible ? "Hide password" : "Show password"}
                        className="shrink-0 text-slate-400 transition hover:text-blue-600"
                    >
                        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                }
            />
        </div>
    );
}
