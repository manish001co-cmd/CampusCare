import { Lock } from "lucide-react";
import Badge from "../../../atoms/Badge";

const privacyByType = {
    personal: {
        confidential: true,
        noteClass: "bg-rose-50 border border-rose-200 text-rose-800",
    },
    academic: {
        confidential: false,
        noteClass: "bg-white border border-slate-200 text-slate-700",
    },
    career: {
        confidential: false,
        noteClass: "bg-white border border-slate-200 text-slate-700",
    },
};

export default function SessionHistoryCard({ item }) {
    const privacy = privacyByType[item.type] || privacyByType.academic;

    return (
        <article className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800">
                    {item.date} · {item.title}
                </span>
                <div className="flex items-center gap-2">
                    {privacy.confidential && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                            <Lock size={9} />
                            Confidential · Visible only to Counsellor
                        </span>
                    )}
                    <Badge variant="success">Completed</Badge>
                </div>
            </div>
            <p className="mt-1 text-xs text-slate-600">
                Mentor: <strong>{item.mentor}</strong> ({item.type} counselling)
            </p>
            <p className={`mt-2 rounded-lg p-2.5 text-xs ${privacy.noteClass}`}>
                {privacy.confidential ? (
                    <span className="flex items-center gap-1.5">
                        <Lock size={11} />
                        <strong>Confidential session.</strong> Outcome notes are
                        visible only to the assigned counsellor.
                    </span>
                ) : (
                    <>
                        <strong>Counsellor Outcome Note:</strong> {item.outcome}
                    </>
                )}
            </p>
        </article>
    );
}
