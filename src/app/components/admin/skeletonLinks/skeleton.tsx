import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLinks() {
    return (
        <div className="w-full flex flex-col gap-3 mt-4  items-center justify-center gap- h-screen overflow-y-hidden">
            {Array(6).fill(0).map((_, i) => {
                return <Skeleton key={i} className=" bg-gray-200 animate-pulse rounded h-28  w-full" />
            }
            )}
        </div>
    );
}