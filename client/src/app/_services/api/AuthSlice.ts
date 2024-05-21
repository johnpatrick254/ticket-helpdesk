import { createSlice } from "@reduxjs/toolkit";
type User = {
    exp: number,
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role: "user" | "support"
}
const initialState: {
    user: null | User,
    token: null | string
} = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            const token = payload.token as string;
            const user = payload.user as User;
            state.token = token;
            state.user = user ;
        },
        clearUser: (state) => {
            state.token = null;
            state.user = null;
        }


    }
})
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer