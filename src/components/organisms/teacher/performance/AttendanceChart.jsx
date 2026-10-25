import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function AttendanceChart({ data }) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xs font-bold text-slate-700">
                Student Attendance Overview
            </h2>
            <div className="w-full" style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10, fill: "#64748b" }}
                        />
                        <YAxis
                            tick={{ fontSize: 10, fill: "#64748b" }}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #e2e8f0",
                            }}
                            formatter={(value, name) => [
                                `${value}${name === "Attendance" ? "%" : ""}`,
                                name,
                            ]}
                        />
                        <Bar dataKey="Attendance" radius={[6, 6, 0, 0]}>
                            {data.map((entry) => (
                                <Cell key={entry.name} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-500">
                <span>
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    Good ≥ 80%
                </span>
                <span>
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-400" />
                    At Risk 75-79%
                </span>
                <span>
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-500" />
                    Critical &lt;75%
                </span>
            </div>
        </section>
    );
}
