import { ArrowRight } from "lucide-react";
import Button from "../../atoms/Button";

export default function LoginSubmitButton({ role, isLoading }) {
    return (
        <Button
            type="submit"
            variant="gradient"
            size="lg"
            isLoading={isLoading}
            className="w-full"
        >
            {!isLoading && (
                <>
                    <span className="capitalize">Sign In as {role}</span>
                    <ArrowRight size={17} />
                </>
            )}
        </Button>
    );
}
