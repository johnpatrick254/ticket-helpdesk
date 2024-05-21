"use client"

import { clearUser } from "@/app/_services/api/AuthSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"

export default function Logout() {
    const dispatch = useDispatch();
    const router = useRouter();

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
