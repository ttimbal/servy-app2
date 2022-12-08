import {ReactNode} from "react";
import {IRepository} from "../../modules/repository/models/IRepository";
import {ITeam} from "../../modules/team/models/ITeam";
import {IProject} from "../../modules/projects/models/IProject";
import {IDatabase} from "../../modules/database/models/IDatabase";

export type PropsWithChild = {
    children?: ReactNode
    title?: string
    className?:string
    func?:any
}

export type PropsRepo = {
    repo: IRepository
}

export type PropsTeam= {
    team: ITeam
}

export type PropsProject= {
    project: IProject
}

export type PropsDatabase= {
    database: IDatabase
}


