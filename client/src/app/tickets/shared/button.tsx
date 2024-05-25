"use client"
import React from 'react'
export default function Button({ children, type, clickHandler }: { children: React.ReactNode, type: "primary" | "error", clickHandler: () =>void }) {
    return (
        <button className={`btn-${type}`} onClick={async()=> await clickHandler()}>{children}</button>
    )
}
