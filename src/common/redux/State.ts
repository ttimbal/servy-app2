import {State} from "../models/State";
export interface DefaultState<T,I> {
    value: T,
    selected: I|undefined,
    status:State,
    error:string|undefined,
}