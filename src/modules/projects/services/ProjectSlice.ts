import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialState, IProject} from "../models/IProject"
import type {AppState} from '../../../common/redux/store'
import {State, STATE_FAILURE, STATE_SUCCESS} from "../../../common/models/State";

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.status = STATE_SUCCESS;
            state.value = action.payload;
        },
        createProject: (state, action: PayloadAction<IProject>) => {
            const found = state.value.find((project:IProject) => {
                return project.id === action.payload.id
            });

            if (!found){
                state.status = STATE_SUCCESS;
                state.value=[action.payload,...state.value];
            }
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

export const selectProjectByID=(id:string)=> {
    return (state: AppState) => {
        return state.project.value.find((project:IProject) => project.id === id)
    }
}

export const projectSelector = (state: AppState) => state.project
export const {setProjects,createProject,addError} = projectSlice.actions
export default projectSlice.reducer