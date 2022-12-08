import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialState, IDatabase} from "../models/IDatabase"
import type {AppState} from '../../../common/redux/store'
import {State, STATE_FAILURE, STATE_SUCCESS} from "../../../common/models/State";

export const databaseSlice = createSlice({
    name: 'database',
    initialState,
    reducers: {
        setDatabases: (state, action: PayloadAction<IDatabase[]>) => {
            state.status = STATE_SUCCESS;
            state.value = action.payload;
        },
        createDatabase: (state, action: PayloadAction<IDatabase>) => {
            state.value=[action.payload,...state.value];
        },
        setState: (state, action: PayloadAction<State>) => {
            state.status=action.payload;
        },
        addError: (state, action: PayloadAction<string>) => {
            state.status=STATE_FAILURE;
            state.error=action.payload;
        },
    },
})

export const databaseSelector = (state: AppState) => state.database
export const {setDatabases,createDatabase,addError} = databaseSlice.actions
export default databaseSlice.reducer