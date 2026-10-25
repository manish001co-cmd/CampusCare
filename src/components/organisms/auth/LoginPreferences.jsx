export default function LoginPreferences({ onForgotPassword }) {
    return (
        <div className="flex items-center justify-between pt-0.5">
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
                <input
                    type="checkbox"
                    defaultChecked
                    className="h-3.5 w-3.5 rounded border-slate-300 accent-blue-600"
                />
                Remember me
            </label>
            <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
                Forgot password?
            </button>
        </div>
    );
}
