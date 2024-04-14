"use client"
import React from 'react'
import BrandLogo from "../../../../public/brandlogo.svg"
import Image from 'next/image'
import Link from 'next/link'
import z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function page() {

    const loginSchema = z.object({
        email: z.string().email({ message: "Invalid Email" }),
        password: z.string().min(6, "Password must have at least 6 characters long"),
    })

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema), defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: unknown) => {
        try {
            const validatedData = loginSchema.parse(data);

        } catch (error: any) {
            console.log(error.error)
        }
    }
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
                                id="passowrd"
                                placeholder="Password"
                                {...register('email')}
                            />
                            <label
                                htmlFor="passowrd"
                                className="pointer-events-none absolute left-3 bottom-6 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem]  motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                            >Password
                            </label>
                        </div>
                        <span className='text-error'><small>{errors?.password?.message}</small></span>
                        <div className="mb-6 flex flex-col items-start justify-between">
                            {/* <!-- Remember me checkbox --> */}
                            <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                                <input
                                    className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                                    type="checkbox"
                                    value=""
                                    id="exampleCheck2" />
                                <label
                                    className="inline-block ps-[0.15rem] hover:cursor-pointer"

                                    htmlFor="exampleCheck2">
                                    Remember me
                                </label>
                            </div>

                            {/* <!--Forgot password link--> */}
                            <a href="#!" className='hover:text-primary'>Forgot password?</a>
                        </div>

                        {/* <!-- Login button --> */}
                        <div className="text-center lg:text-left">
                            <button
                                type="submit"
                                className="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                data-twe-ripple-init
                                data-twe-ripple-color="light">
                                Login
                            </button>

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
