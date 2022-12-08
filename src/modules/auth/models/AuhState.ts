import {User} from "../../../common/models/User";
import {State,STATE_LOADING,STATE_FAILURE,STATE_AUTHENTICATED,STATE_UNAUTHENTICATED} from '../../../common/models/State'

export type AuthState = {
    value: User|null,
    status:State
}

export const initialState:AuthState={
    value: null,
    status:STATE_UNAUTHENTICATED
}