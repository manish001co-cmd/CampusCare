export default function AuthLayout({
    heroPanel,
    children,
}) {
    return (
        <main className="h-screen w-full overflow-hidden bg-slate-50 lg:grid lg:grid-cols-12">
            {/* Left Hero Brand Panel */}
            {heroPanel}

            {/* Right Form Panel */}
            <section className="flex h-full w-full flex-col justify-center overflow-y-auto bg-white px-5 py-6 sm:px-10 lg:col-span-7 lg:overflow-hidden lg:px-12 xl:col-span-7 xl:px-16">
                <div className="mx-auto w-full max-w-md">
                    {children}
                </div>
            </section>
        </main>
    );
}
