import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLinks() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap- h-[40em] overflow-y-hidden">
            {Array(7).fill(0).map((_, i) => {
                return <Skeleton key={i} className=" bg-gray-200 animate-pulse rounded py-7 my-2 w-full" />
            }
            )}
        </div>
    );
}