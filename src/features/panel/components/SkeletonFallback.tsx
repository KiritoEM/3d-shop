import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FC } from "react";

type SkeletonFallbackProps = {
    className?: string;
    label?: string;
};

const SkeletonFallback: FC<SkeletonFallbackProps> = ({
    className,
    label,
}): JSX.Element => (
    <Skeleton
        className={cn(
            "user-card-skeleton flex h-[400px] w-full items-center justify-center rounded-lg",
            className,
        )}
    >
        <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-current" />

            {label && <p>{label}</p>}
        </div>
    </Skeleton>
);

export default SkeletonFallback;
