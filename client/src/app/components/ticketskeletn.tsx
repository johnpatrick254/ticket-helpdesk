import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function TicketSkeleton() {
    return (
        <Skeleton className='card my-5 space-y-2' >
            <Skeleton className='w-10 h-4'></Skeleton>
            <Skeleton className='h-10'></Skeleton>
            <Skeleton >

                <Skeleton className="w-3"></Skeleton>

            </Skeleton>
        </Skeleton>
    )
}
