import { CalendarCheck, ChartNoAxesCombined } from "lucide-react";
import LoginHeroFeature from "./LoginHeroFeature";

const features = [
    {
        icon: CalendarCheck,
        title: "Personalized Counselling",
        description: "Confidential 1-on-1 sessions & guidance",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Performance & Growth Insights",
        description: "Track progress, feedback, and wellness metrics",
    },
];

export default function LoginHeroFeatures() {
    return (
        <div className="relative mt-6 space-y-3.5">
            {features.map((feature) => (
                <LoginHeroFeature key={feature.title} {...feature} />
            ))}
        </div>
    );
}
