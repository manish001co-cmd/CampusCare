import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export default function ClassHealthChart({ data }) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xs font-bold text-slate-700">
                Class Health Radar
            </h2>
            <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={data}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis
                            dataKey="category"
                            tick={{ fontSize: 10, fill: "#64748b" }}
                        />
                        <Radar
                            dataKey="value"
                            stroke="#1d4ed8"
                            fill="#3b82f6"
                            fillOpacity={0.25}
                            strokeWidth={2}
                        />
                        <Tooltip
                            contentStyle={{ fontSize: 11, borderRadius: 8 }}
                            formatter={(value) => [`${value}%`]}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
