import {UserGitHub} from "./UserGitHub";

export interface User {
    email:string
    githubToken:string
    id:string
    photoURL:string
    username:string
    userGitHub:UserGitHub|null
}