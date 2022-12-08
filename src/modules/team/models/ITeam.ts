import {STATE_EMPTY, STATE_LOADING} from "../../../common/models/State";
import {DefaultState} from "../../../common/redux/State";

export interface IMember{
    id:string,
    username:string,
    image_profile:string,
    date_added:string,
}

export interface ITeam {
    id: string,
    name: string,
    members_id: string[],
    members: IMember[],
    owner_id:string,
    created_at:string
}


export const initialState: DefaultState<ITeam[],ITeam> = {
    value: [],
    selected:undefined,
    status: STATE_LOADING,
    error:""
}