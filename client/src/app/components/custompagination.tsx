import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function CustomPagination({ lastPage = 14, currentPage = 14, setCurrentPage }: { lastPage: number, currentPage: number, setCurrentPage: (num: number) => void }) {

    return (
        <Pagination>
            <PaginationContent>
                {
                    (currentPage === 1)
                        ?
                        <>
                            <PaginationLink
                                onClick={() => setCurrentPage(1)}
                                isActive={currentPage === 1}
                                className="hover:cursor-pointer"
                            >
                                1
                            </PaginationLink>
                        </>
                        :
                        <>
                            < PaginationPrevious
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="hover:cursor-pointer"
                            />
                            {
                                Math.abs(currentPage - 1) > 1
                                &&
                                <>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(1)}
                                        isActive={currentPage === 1}
                                        className="hover:cursor-pointer"
                                    >
                                        1
                                    </PaginationLink>
                                    <PaginationEllipsis />
                                </>
                            }
                        </>
                }
                {
                    (currentPage !== lastPage)
                    &&
                    <>
                        <PaginationItem>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => setCurrentPage((currentPage === 1) ? (currentPage + 1) : (currentPage - 1))}
                                isActive={currentPage === ((currentPage === 1) ? (currentPage + 1) : (currentPage - 1))}
                                className="hover:cursor-pointer"
                            >
                                {(currentPage === 1) ? (currentPage + 1) : (currentPage - 1)}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            {
                                ((lastPage - currentPage) > 0)
                                &&
                                <PaginationLink
                                    onClick={() => setCurrentPage((currentPage === 1) ? (currentPage + 2) : currentPage)}
                                    isActive={currentPage === ((currentPage === 1) ? (currentPage + 2) : currentPage)}
                                    className="hover:cursor-pointer"
                                >
                                    {(currentPage === 1) ? (currentPage + 2) : currentPage}
                                </PaginationLink>
                            }
                        </PaginationItem></>
                }

                {
                    (lastPage === currentPage)
                        ?
                        <PaginationItem>
                            {(currentPage !== 1)
                                &&
                                <PaginationLink
                                    onClick={() => setCurrentPage(lastPage)}
                                    isActive={currentPage === lastPage}
                                    className="hover:cursor-pointer"
                                >
                                    {lastPage}
                                </PaginationLink>
                            }
                        </PaginationItem>
                        :
                        <>
                            <PaginationItem>
                                {(currentPage !== 1)
                                    &&
                                    <PaginationLink
                                        onClick={() => setCurrentPage((currentPage + 1))}
                                        isActive={currentPage === (currentPage + 1)}
                                        className="hover:cursor-pointer"
                                    >
                                        {(currentPage + 1)}
                                    </PaginationLink>
                                }
                            </PaginationItem>
                            <PaginationEllipsis />
                            <PaginationLink
                                onClick={() => setCurrentPage(lastPage)}
                                className="hover:cursor-pointer "
                            >
                                {lastPage}
                            </PaginationLink>
                            <PaginationItem>
                                <PaginationNext className="hover:cursor-pointer" onClick={() => setCurrentPage(currentPage + 1)} />
                            </PaginationItem>

                        </>
                }

            </PaginationContent>
        </Pagination >
    )
}
