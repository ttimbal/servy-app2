import {DefaultState} from "../../../common/redux/State";
import {STATE_LOADING} from "../../../common/models/State";
export interface Config {
    content_type: string;
    insecure_ssl: string;
    url: string;
}

export interface LastResponse {
    code?: any;
    status: string;
    message?: any;
}

export interface Webhook {
    type: string;
    id: number;
    name: string;
    active: boolean;
    events: string[];
    config: Config;
    updated_at: Date;
    created_at: Date;
    url: string;
    test_url: string;
    ping_url: string;
    deliveries_url: string;
    last_response: LastResponse;
}

export interface IBranch{
    name:string
}

export interface IRepository {
    name:string,
    html_url:string,
    updated_at:string,
    branches:IBranch[]
    owner:{
        login:string
    }
}

export const initialState: DefaultState<IRepository[],IRepository> = {
    value: [],
    selected: undefined,
    status: STATE_LOADING,
    error:""
}