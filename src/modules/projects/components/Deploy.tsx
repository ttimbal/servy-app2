import {IProject} from "../models/IProject";
import {useTranslation} from "next-i18next";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {IBranch, IRepository, Webhook} from "../../repository/models/IRepository";
import Repository from "../../repository/components/Repository";
import {authSelector} from "../../auth/services/AuthSlice";
import {
    addError,
    addRepositories,
    repositorySelector,
    selectRepositoryByName
} from "../../repository/services/RepositorySlice";
import useForm from "../../../common/hooks/useForm";
import {createWebHook, getBranches} from "../../repository/services/RepositoryService";
import {updateProject} from "../services/ProjectService";
import repository from "../../repository/components/Repository";
import {useEffect, useState} from "react";
import Resizable from "../../../common/components/elements/Resizable";
import project from "./Project";

interface Props {
    project: IProject
}


function Setting(props: Props) {
    const {t} = useTranslation();
    const auth = useAppSelector(authSelector);
    const currentRepo = useAppSelector(selectRepositoryByName(props.project.repository));
    const [message,setMessage]=useState('');
    const currentProject=JSON.parse(JSON.stringify(props.project));


    async function enableWebhook() {
        if (auth.value!==null && currentRepo) {
            try {
                const webhook: Webhook|undefined = await createWebHook(currentRepo.owner.login, currentRepo.name, auth.value.githubToken);
                console.log(webhook)
                if (webhook){
                    currentProject.webhook=webhook;
                    await updateProject(currentProject.id,currentProject);
                    setMessage(t('Automatic deploy enabled'));
                }else{
                    setMessage(t('Oops! something went wrong, please retry more later'));
                }
            }catch (e) {
                console.log(e)
                setMessage(t('Oops! something went wrong, please retry more later'));
            }
        }
    }

    return <div className={'flex justify-center items-center'}>
        <div className={'w-1/4 border p-5 rounded-md'}>
            <div>
                <label htmlFor="">{t('Name')}</label>
                <input type="text" name={'name'} value={currentProject.name} disabled={true}/>
            </div>

            <div className={'mt-2'}>
                <label htmlFor="">{t('Repository')}</label>
                <input type="text" name={'repository'} disabled={true} value={currentProject.repository}/>
            </div>

            <div className={'mt-2'}>
                <label htmlFor="">{t('Branch')}</label>
                <input type="text" name={'branch'} disabled={true} value={currentProject.branch}/>
            </div>

            <button className={'btn-gradient blue-background-button mt-8'}>{t('Start deploy')}</button>
            {currentProject.webhook===undefined &&
                <button className={'btn-gradient blue-background-button mt-5'} onClick={enableWebhook}>{t('Enable automatic deploy')}</button>
            }
            {message.length!==0 && <span>{message}</span>}
        </div>
    </div>
}

export default Setting
