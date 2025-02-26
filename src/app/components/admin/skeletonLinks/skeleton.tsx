import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLinks() {
    return (
        <div className="w-full mt-8 flex flex-col items-center justify-center gap- h-[44em] overflow-y-hidden">
            {Array(10).fill(0).map((_, i) => {
                return <Skeleton key={i} className="p-10 bg-gray-200 animate-pulse rounded mb-2 h-6 w-full" />
            }
            )}
        </div>
    );
}