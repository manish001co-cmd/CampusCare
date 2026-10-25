import LoginHeroBrand from "./LoginHeroBrand";
import LoginHeroMessage from "./LoginHeroMessage";
import LoginHeroFeatures from "./LoginHeroFeatures";
import LoginHeroSecurity from "./LoginHeroSecurity";

export default function LoginHeroPanel() {
    return (
        <aside className="relative hidden h-full flex-col justify-between overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-blue-900 p-8 text-white lg:col-span-5 lg:flex xl:col-span-5 xl:p-12">
            <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <LoginHeroBrand />
            <div className="relative my-auto py-6">
                <LoginHeroMessage />
                <LoginHeroFeatures />
            </div>
            <LoginHeroSecurity />
        </aside>
    );
}
