import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialState, IRepository} from "../models/IRepository"
import type {AppState} from '../../../common/redux/store'
import {State, STATE_FAILURE, STATE_SUCCESS} from "../../../common/models/State";

export const repositorySlice = createSlice({
    name: 'repository',
    initialState,
    reducers: {
        addRepositories: (state, action: PayloadAction<IRepository[]>) => {
            state.status = STATE_SUCCESS;
            state.value = action.payload;
        },
        setState: (state, action: PayloadAction<State>) => {
            state.status=action.payload;
        },
        selectedRepository:(state,action:PayloadAction<IRepository>)=> {
            state.selected=action.payload;
        },
        addError: (state, action: PayloadAction<string>) => {
            state.status=STATE_FAILURE;
            state.error=action.payload;
        },
    },
});

export const selectRepositoryByName=(name:string)=> {
    return (state: AppState) => {
        return state.repository.value.find((repo: IRepository) => repo.name === name)
    }
}

export const repositorySelector = (state: AppState) => state.repository
export const {addRepositories,addError, selectedRepository} = repositorySlice.actions
export default repositorySlice.reducer