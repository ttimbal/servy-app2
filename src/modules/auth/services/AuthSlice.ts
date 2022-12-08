import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

import {AuthState, initialState} from "../models/AuhState"

import type {AppState} from '../../../common/redux/store'
import {User} from "../../../common/models/User";
import {signInWithGitHub} from "./AuthService";
import {State, STATE_AUTHENTICATED, STATE_LOADING} from "../../../common/models/State";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const signInAsync = createAsyncThunk(
    'auth/login',
    async () => {
        const response: AuthState = await signInWithGitHub();
        return response;
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        signIn: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
          //  state.value += 1
            //state.value

        },
        singOut: (state) => {
           // state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        failure: (state, action: PayloadAction<State>) => {
            state.status = action.payload
        },
        saveUser: (state, action: PayloadAction<User>) => {
            state.value = action.payload
            state.status=STATE_AUTHENTICATED
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInAsync.pending, (state) => {
                state.status = STATE_LOADING
            })
            .addCase(signInAsync.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.value = action.payload.value
            })
    },
})

export const authSelector = (state: AppState) => state.auth
export const { failure,saveUser } = authSlice.actions
export default authSlice.reducer