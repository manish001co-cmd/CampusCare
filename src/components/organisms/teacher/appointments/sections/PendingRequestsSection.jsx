import RequestCard from "../RequestCard";

export default function PendingRequestsSection({ requests, onAction }) {
    if (requests.length === 0) return null;

    return (
        <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                Pending Inbox
            </h2>
            <div className="space-y-4">
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
