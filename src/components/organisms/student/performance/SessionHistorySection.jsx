import SessionHistoryCard from "./SessionHistoryCard";

export default function SessionHistorySection({ history }) {
    return (
        <section className="rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <h2 className="border-b border-slate-100 pb-4 text-sm font-bold text-slate-900">
                Counselling Session History
            </h2>
            <div className="mt-5 space-y-4">
                {history.length ? (
                    history.map((item) => (
                        <SessionHistoryCard key={item.id} item={item} />
                    ))
                ) : (
                    <p className="text-sm text-slate-500">
                        No completed counselling sessions recorded.
                    </p>
                )}
            </div>
        </section>
    );
}
