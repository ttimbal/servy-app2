import {IProject} from "../models/IProject";
import {useTranslation} from "next-i18next";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {IBranch, IRepository} from "../../repository/models/IRepository";
import Repository from "../../repository/components/Repository";
import {authSelector} from "../../auth/services/AuthSlice";
import {
    addError,
    addRepositories,
    repositorySelector,
    selectRepositoryByName
} from "../../repository/services/RepositorySlice";
import useForm from "../../../common/hooks/useForm";
import {getBranches} from "../../repository/services/RepositoryService";
import {updateProject} from "../services/ProjectService";
import repository from "../../repository/components/Repository";
import {useEffect, useState} from "react";
import Resizable from "../../../common/components/elements/Resizable";

interface Props {
    project: IProject
}


function Setting(props: Props) {
    const {t} = useTranslation();
    const [message,setMessage]=useState('');
    const [form, formChanged, _] = useForm({
        name: props.project.name,
        repository: props.project.repository??"",
        branch: props.project.branch??"",
        repository_url:"",
    });

    const repositories = useAppSelector(repositorySelector);
    const currentRepo = useAppSelector(selectRepositoryByName(form.repository));
    const auth = useAppSelector(authSelector);

    const dispatch = useAppDispatch()

    useEffect(()=>{
        if (repositories.value.length>0 && props.project.repository && props.project.repository!==''){
            loadBranches({
                target:{
                    name:'repository',
                    value:props.project.repository
                }
            }).then();
        }
    },[repositories.value.length]);

    async function loadBranches(e: any) {
        formChanged(e);

        const repoName:string=e.target.value;
        const repo=repositories.value.find((repo: IRepository) => repo.name === repoName);

        if (!repo){
            return
        }

        formChanged({
           target:{
               name:'repository_url',
               value:repo.html_url
           }
        });

        const token = auth.value?.githubToken
        const username = repo.owner.login;
        try {
            if (token && username) {
                const branches: IBranch[] = await getBranches(username, repoName, token);
                if (branches.length>0){
                    form.branch=branches[0].name;
                }

                const repos: IRepository[] = [];
                repositories.value.forEach((repo: IRepository) => {
                    if (repo.name === repoName) {
                        repos.push({...repo,branches})
                    }else{
                        repos.push(repo);
                    }
                });

                dispatch(addRepositories(repos));
            }
        } catch (e) {
            dispatch(addError((e as Error).message))
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            await updateProject(props.project.id, form);
            setMessage('Saved')
        }catch (e){
            dispatch(addError((e as Error).message))
        }
    }

    return <div className={'flex justify-center items-center'}>
        <form  onSubmit={handleSubmit} className={'w-1/4'}>
            <fieldset className={'border p-5 rounded-md'}>
                <legend className={'font-semibold '}>{t('Project Settings')}</legend>
            <div>
                <label htmlFor="">{t('Name')}</label>
                <input type="text" name={'name'} value={form.name} onChange={formChanged} required={true}/>
            </div>
            <div className={'mt-2'}>
                <label htmlFor={'repository'}>{t('Repository')}</label>
                <select name="repository" value={form.repository} onChange={(e) => loadBranches(e)} required={true}>
                    <option value={''}>{'Select one repository'}</option>
                    {repositories.value.map((repository: IRepository) => {
                        return <option key={repository.name} value={repository.name}>{repository.name}</option>
                    })}

                </select>
            </div>
            <div className={'w-full mt-2'} >
                <label htmlFor={'branch'}>{t('Branch')}</label>
                <select name={'branch'} value={form.branch} onChange={formChanged} required={true}>
                    { form.repository &&!!currentRepo?.branches && currentRepo.branches.map((branch: IBranch) => {
                        return <option key={branch.name} value={branch.name}>{branch.name}</option>
                    })}
                </select>
            </div>
            <button className={'btn-gradient blue-background-button mt-5'}>{t('Save configuration')}</button>
            </fieldset>

        </form>
    </div>
}

export default Setting
