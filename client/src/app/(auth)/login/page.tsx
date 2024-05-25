"use client"
import React, { useState } from 'react'
import BrandLogo from "../../../../public/brandlogo.svg"
import Image from 'next/image'
import Link from 'next/link'
import z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import axios from "axios"
import { jwtDecode } from 'jwt-decode'
import { setUser } from '@/app/_services/api/AuthSlice'
import { useRouter } from 'next/navigation'
import { getToken } from '@/app/_utills/auth'
import { toast } from 'react-toastify'
import { ScaleLoader } from 'react-spinners'


export default function page() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const dispatch = useDispatch()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const loginSchema = z.object({
        email: z.string().email({ message: "Invalid Email" }),
        password: z.string().min(4, "Password must have at least 4 characters long"),
    })
    const auth = getToken();
    if (auth?.token && auth?.user) {
        router.push('/');
    }
    axios.get(`${BASE_URL}/health`).then(res=>{
        console.log(`\n ********** server status:${res.data.status} ************\n`)
    })
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema), defaultValues: {
            email: 'demo@mail.com',
            password: '1234'
        }
    });
    const onSubmit = async (data: unknown) => {
        setIsLoading(true);
        try {
            const validatedData = loginSchema.parse(data);
            const { token } = (await axios.post(`${BASE_URL}/auth/login`, validatedData)).data as { token: string }
            const user = jwtDecode(token);
            dispatch(setUser({ user, token }));
            localStorage.setItem('auth', JSON.stringify({ user, token }))
            toast.success('Success ')
            setIsLoading(false);
            router.push('/');
        } catch (error: any) {
            setIsLoading(false);
            toast.error('Incorrect password or email ')
            console.log(error)
        }
    };


    return <section className="h-screen">
        <div className="h-full">
            {/* <!-- Left column container with background--> */}
            <div
                className="flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div
                    className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                    <Image
                        src={BrandLogo}
                        className="w-full h-full"
                        height={100}
                        alt="Sample image" />
                </div>

                {/* <!-- Right column container --> */}
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-3/4 space-y-8'>
                        {/* <!--Sign in section--> */}
                        <div
                            className="flex flex-row items-center justify-center lg:justify-start">
                            <h2 className="mb-0 me-4 text-lg">Welcome back to Help-desk</h2>
                        </div>

                        {/* <!-- Separator between social media sign in and email/password sign in --> */}
                        <div
                            className="my-4 flex items-center before: before:flex-1 before:border-t before:border-neutral-300  after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                        </div>

                        {/* <!-- Email input --> */}
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                                type="text"
                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-slate-500 dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                id="email"
                                placeholder="Email address"
                                {...register('email')}
                            />
                            <label
                                htmlFor="email"
                                className="pointer-events-none absolute left-3 bottom-6 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem]  motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Email address
                            </label>
                        </div>
                        <span className='text-error'><small>{errors?.email?.message}</small></span>
                        {/* <!-- Password input --> */}
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                                type="password"
                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                id="password"
                                placeholder="Password"
                                {...register('password')}
                            />
                            <label
                                htmlFor="password"
                                className="pointer-events-none absolute left-3 bottom-6 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem]  motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Password
                            </label>
                        </div>
                        <span className='text-error'><small>{errors?.password?.message}</small></span>
                        <div className="mb-6 flex flex-col items-start justify-between">
                        </div>

                        {/* <!-- Login button --> */}
                        <div className="text-center lg:text-left">
                            {
                                isLoading
                                    ?
                                    <div
                                        className='mx-auto w-max  '
                                    >
                                        <ScaleLoader
                                            height="30px"
                                            width="4px"
                                            color="#7856ff"
                                            speedMultiplier={2}
                                        />
                                    </div>

                                    :
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light">
                                        Login
                                    </button>
                            }

                            {/* <!-- Register link --> */}
                            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                Don't have an account?
                                <Link
                                    href="/register"
                                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                >Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
}
