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
import {HttpClient} from "../../../common/services/http/HttpClient";

function CreateDatabase(props: PropsWithChild) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authSelector);
    const teams = useAppSelector(teamSelector);
    const [form,formChanged,_]=useForm({type:""});
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true)

        try {
            form.owner_id=auth.value?.id
            form.team_id=teams.selected?.id
            if (form.type===""){
                form.type="MySQL"
            }
            const database = await addDatabase(form);

            let engine="mysql"
            if (form.type==="PostgreSQL"){
                engine="postgres"
            }


            const response=await HttpClient.post('https://ees77tjidg.execute-api.us-east-1.amazonaws.com/Prod/database/create',{
                db_id:database.id,
                db_type:engine
            });

            console.log(response.data)
            //dispatch(createDatabase(database))
            setLoading(false);

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
            {loading && <div className={'flex justify-center'}>
                <i className="uil uil-spinner-alt text-center animate-spin text-3xl text-yellow-500"></i>
            </div>}
    </div>

    <div>
        <button className={'btn-gradient blue-background-button mt-5'}>{t('Add database')}</button>
    </div>
</form>
}

export default CreateDatabase
