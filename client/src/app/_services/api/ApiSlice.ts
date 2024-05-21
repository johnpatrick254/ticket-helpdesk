"use client"

import { getToken } from '@/app/_utills/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const auth = getToken();
            if (auth) {
                const { token } = auth;
                headers.set('Authorization', token ?? '');
            }

            return headers;
        }
    }),
    endpoints: () => ({}),
});

