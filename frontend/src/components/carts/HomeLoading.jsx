import { Skeleton } from "@/components/ui/skeleton"

const HomeLoading = () => {

    const ProductSkeleton = () => {
        return (
            <div className="border p-2 rounded-md bg-gray-300 dark:bg-gray-700 ">
                <Skeleton className="w-10 md:w-20 lg:w-30 h-10 md:h-20 lg:h-30 mx-auto mb-2 rounded-md" />
                <Skeleton className=" h-2 md:h-4 lg:h-6 w-full mb-1" />
                <Skeleton className=" h-2 md:h-4 lg:h-6 w-3/4" />
            </div>
        )
    }

    const HorizontalSkeleton = () => {
        return (
            <div className="w-fit p-2 bg-gray-300 dark:bg-gray-700  rounded-md border">
                <Skeleton className="w-40 h-40 rounded-md mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
            </div>
        )
    }

    return (
        <>
            <div className="relative ">
                <Skeleton className="w-full h-[30vh] md:h-[90vh] bg-gray-300 dark:bg-gray-700 ">
                </Skeleton>

                <div className="max-w-7xl mx-auto ">

                    <div className="grid gap-1 md:gap-3 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:absolute md:top-[60%] bg-transparent">
                        <div className="grid grid-cols-2 gap-2">
                            {
                                Array.from({ length: 4 }).map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {
                                Array.from({ length: 4 }).map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {
                                Array.from({ length: 4 }).map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {
                                Array.from({ length: 4 }).map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                
            </div>

           
        </>
    )
}

export default HomeLoading