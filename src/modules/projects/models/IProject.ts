import {DefaultState} from "../../../common/redux/State";
import {STATE_LOADING} from "../../../common/models/State";
import {Webhook} from "../../repository/models/IRepository";

export interface IProject {
    id:string,
    name:string,
    owner_id:string,
    team_id:string,
    repository:string,
    repository_url:string,
    branch:string,
    webhook:Webhook,
    created_at:string,
    state:string,
    app_url:string,
}

export const initialState: DefaultState<IProject[],IProject> = {
    value: [],
    selected:undefined,
    status: STATE_LOADING,
    error:""
}