import {useTranslation} from "next-i18next";
import {useState} from "react";
import {PropsWithChild} from "../../../common/models/Props";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {authSelector} from "../../auth/services/AuthSlice";
import useForm from "../../../common/hooks/useForm";
import {addProject} from "../services/ProjectService";
import {addError} from "../services/ProjectSlice";
import {teamSelector} from "../../team/services/TeamSlice";

function CreateProject(props:PropsWithChild) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authSelector);
    const teams = useAppSelector(teamSelector);

    const [form,formChanged,_]=useForm({name:""});

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            form.owner_id=auth.value?.id
            form.team_id=teams.selected?.id
            const project = await addProject(form);
            //dispatch(createProject(project))
        } catch (e) {
            dispatch(addError((e as Error).message))
        }

        props.func(false);
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">{t('Name')}</label>
            <input type="text" name={'name'} placeholder={t('Write the name of the project')} required={true} value={form.name} onChange={formChanged}/>
        </div>

        <div>
            <button className={'btn-gradient blue-background-button mt-5'}>{t('Add project')}</button>
        </div>
    </form>
}

export default CreateProject
