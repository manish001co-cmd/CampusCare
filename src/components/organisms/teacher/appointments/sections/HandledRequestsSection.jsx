import RequestCard from "../RequestCard";

export default function HandledRequestsSection({ requests, onAction }) {
    if (requests.length === 0) return null;

    return (
        <section className="mt-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                Handled
            </h2>
            <div className="space-y-3">
                {requests.map((request) => (
                    <RequestCard
                        key={request.id}
                        request={request}
                        onAction={onAction}
                    />
                ))}
            </div>
        </section>
    );
}
