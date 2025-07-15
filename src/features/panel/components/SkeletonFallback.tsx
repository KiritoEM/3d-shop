import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FC } from "react";

type SkeletonFallbackProps = {
    className?: string;
};

const SkeletonFallback: FC<SkeletonFallbackProps> = ({
    className,
}): JSX.Element => (
    <Skeleton
        className={cn(
            "user-card-skeleton flex h-[400px] w-full items-center justify-center rounded-lg",
            className,
        )}
    >
        <div className="h-9 w-9 animate-spin rounded-full border-b-2 border-current"></div>
    </Skeleton>
);

export default SkeletonFallback;
