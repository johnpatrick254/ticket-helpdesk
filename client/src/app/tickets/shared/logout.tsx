"use client"

import { clearUser } from "@/app/_services/api/AuthSlice";
import { getToken } from "@/app/_utills/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"

export default function Logout() {
    const dispatch = useDispatch();
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    axios.get(`${BASE_URL}/health`).then(res => {
        console.log(`\n ********** server status:${res.data.status} ************\n`)
    })
    const auth = getToken();
    if (!auth) {
        router.push('/login')
    }
    const handleLogOut = () => {
        if (typeof window !== 'undefined'){
            dispatch(clearUser());
            window.localStorage.removeItem('auth');
            router.push('login')
        }
    }
    return (
        <button className='btn-error !ml-auto' onClick={handleLogOut}>Log out</button>
    )
}
