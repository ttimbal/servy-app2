import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {initialState, ITeam} from "../models/ITeam"

import type {AppState} from '../../../common/redux/store'
import {State, STATE_FAILURE, STATE_SUCCESS} from "../../../common/models/State";

function orderByCreationDate(teams: ITeam[]): ITeam[] {
    return teams.sort((team1: ITeam, team2: ITeam) => {
        let date1 = new Date(team1.created_at),
            date2 = new Date(team2.created_at);
        return date2.getTime() - date1.getTime();
    });
}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addTeams: (state, action: PayloadAction<ITeam[]>) => {
            state.status = STATE_SUCCESS;
            state.value = orderByCreationDate(action.payload);

            if (action.payload.length > 0) {
                state.selected = action.payload[0]
            }
        },
        selectedTeam: (state, action: PayloadAction<ITeam>) => {
            state.selected = action.payload;
        },

        setSelectedTeamByID: (state, action: PayloadAction<String>) => {
            state.selected=state.value.find((team: ITeam) => team.id === action.payload);
        },

        createTeam: (state, action: PayloadAction<ITeam>) => {
            state.value = [action.payload, ...state.value];
        },
        setState: (state, action: PayloadAction<State>) => {
            state.status = action.payload;
        },
        addError: (state, action: PayloadAction<string>) => {
            state.status = STATE_FAILURE;
            state.error = action.payload;
        },
    },
})

export const teamSelector = (state: AppState) => state.team
export const {addTeams, createTeam, setState, selectedTeam,setSelectedTeamByID} = teamSlice.actions
export default teamSlice.reducer