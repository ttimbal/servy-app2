import {uuidv4} from "@firebase/util";

export function GenerateRandomString(prefix:string):string{
    return prefix+uuidv4().replaceAll('-','');
}