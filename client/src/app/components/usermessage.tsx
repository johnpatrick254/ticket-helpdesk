"use client"
import React from 'react'
import { getToken } from '../_utills/auth'

export default function UserMessage() {
    const auth = getToken() ?? null;

    return <>
        {
            (auth?.user.role === "support")
                ?
                <div className='text-center h-[24px]'>
                    <span className='pill bg-primary !p-1.5 rounded-md !m-0 text-white'>Role: { auth?.user.role}</span>
                </div >
                :
                <></>
        }
    </>

}
