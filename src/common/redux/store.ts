import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'

import authReducer from '../../modules/auth/services/AuthSlice'
import teamReducer from '../../modules/team/services/TeamSlice'
import repositoryReducer from '../../modules/repository/services/RepositorySlice'
import projectReducer from '../../modules/projects/services/ProjectSlice'
import databaseReducer from '../../modules/database/services/DatabaseSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            team: teamReducer,
            repository: repositoryReducer,
            project: projectReducer,
            database: databaseReducer
        },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppState,
    unknown,
    Action<string>>

export default store