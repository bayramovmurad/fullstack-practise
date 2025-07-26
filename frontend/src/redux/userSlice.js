import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createForm: {
        username: "",
        email: "",
        password: ""
    },
    loginForm: {
        email: "",
        password: ""
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers:{
        setCreateForm: (state, action) => {
            const {name, value} = action.payload;

            return{
                ...state,
                createForm:{
                    ...state.createForm,
                    [name]:value
                }
            }
        },
        setLoginForm: (state, action) => {
            const {name, value} = action.payload;

            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    [name]:value
                }
            }
        }
    }
});

export const {setCreateForm, setLoginForm} = userSlice.actions;
export default userSlice.reducer;