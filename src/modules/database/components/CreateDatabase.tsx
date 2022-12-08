import {useTranslation} from "next-i18next";
import {useState} from "react";
import {PropsWithChild} from "../../../common/models/Props";
import {DatabaseTypes} from "../models/IDatabase";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {authSelector} from "../../auth/services/AuthSlice";
import useForm from "../../../common/hooks/useForm";
import {addDatabase} from "../services/DatabaseService";
import {addError, createDatabase} from "../services/DatabaseSlice";
import {teamSelector} from "../../team/services/TeamSlice";

function CreateDatabase(props: PropsWithChild) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authSelector);
    const teams = useAppSelector(teamSelector);
    const [form,formChanged,_]=useForm({type:""});

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            form.owner_id=auth.value?.id
            form.team_id=teams.selected?.id
            const database = await addDatabase(form);
            //dispatch(createDatabase(database))
        } catch (e) {
            dispatch(addError((e as Error).message))
        }

        props.func(false);
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="type">{t('Select the type of your database')}</label>
            <select name="type" value={form.type} onChange={formChanged} required={true}>
            {
                DatabaseTypes.map((type: string, index: number) => {
                    return <option key={index} value={type}>{type}</option>
                })
            }
        </select>
    </div>

    <div>
        <button className={'btn-gradient blue-background-button mt-5'}>{t('Add database')}</button>
    </div>
</form>
}

export default CreateDatabase
