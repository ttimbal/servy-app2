import {DefaultState} from "../../../common/redux/State";
import {STATE_LOADING} from "../../../common/models/State";

export interface IDatabase {
    id:string,
    type:string,
    owner_id:string,
    team_id:string,
    created_at:string
    credentials:{
        host:string,
        port:string,
        username:string,
        password:string,
    }
}

export const DatabaseTypes=[
    "MySQL",
    "PostgreSQL",
/*    "Microsoft SQL Server",
    "Amazon DynamoDB"*/
]

export const initialState: DefaultState<IDatabase[],IDatabase> = {
    value: [],
    selected: undefined,
    status: STATE_LOADING,
    error:""
}