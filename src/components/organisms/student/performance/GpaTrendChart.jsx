import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function GpaTrendChart({ semesterTrend = [] }) {
    if (semesterTrend.length === 0) {
        return (
            <section className="mb-6 rounded-2xl border border-[#e6e2d8] bg-white p-6 text-sm text-slate-500 shadow-sm">
                Semester GPA history has not been recorded.
            </section>
        );
    }

    return (
        <section className="mb-6 rounded-2xl border border-[#e6e2d8] bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-bold text-slate-900">
                CGPA Semester Trend
            </h2>
            <p className="mb-4 text-[11px] text-slate-400">
                Your grade trajectory across semesters
            </p>
            <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={semesterTrend}
                        margin={{ top: 5, right: 20, left: -25, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                            dataKey="semester"
                            tick={{ fontSize: 10, fill: "#64748b" }}
                        />
                        <YAxis
                            tick={{ fontSize: 10, fill: "#64748b" }}
                            domain={[7, 10]}
                        />
                        <Tooltip
                            contentStyle={{
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #e2e8f0",
                            }}
                            formatter={(value) => [`${value} GPA`]}
                        />
                        <ReferenceLine
                            y={8}
                            stroke="#e2e8f0"
                            strokeDasharray="4 4"
                        />
                        <Line
                            type="monotone"
                            dataKey="gpa"
                            stroke="#0f4437"
                            strokeWidth={2.5}
                            dot={{
                                fill: "#0f4437",
                                r: 4,
                                strokeWidth: 2,
                                stroke: "#fff",
                            }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
