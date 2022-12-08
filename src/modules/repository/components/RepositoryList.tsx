import Repository from "./Repository";
import {getRepositories} from "../services/RepositoryService";
import {useEffect, useState} from "react";
import {GithubAuthProvider} from "firebase/auth";
import {IRepository} from "../models/IRepository";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {authSelector} from "../../auth/services/AuthSlice";
import {repositorySelector, addRepositories,addError} from "../services/RepositorySlice";
import {STATE_FAILURE, STATE_LOADING} from "../../../common/models/State";

function RepositoryList(props: any) {
    const dispatch = useAppDispatch();
    const repo = useAppSelector(repositorySelector);
    const auth = useAppSelector(authSelector);

    async function loadRepositories(username:string){
        const token=auth.value?.githubToken??""
        try {
           const repositories:IRepository[]=await getRepositories(username,token);
           dispatch(addRepositories(repositories));
        }catch (e) {
            dispatch(addError((e as Error).message))
        }
    }

    useEffect(() => {
        const username=auth.value?.username
        if (!!username){
            loadRepositories(username).then();
        }
    }, [auth])

    return <div className={'flex flex-col gap-3'}>
        {repo.status===STATE_LOADING && <i className="uil uil-spinner-alt text-center animate-spin text-3xl text-yellow-500"></i>}
        {repo.value.map((repo: IRepository, index: number) => {
            return <Repository key={index} repo={repo}/>
        })}
    </div>
}

export default RepositoryList
