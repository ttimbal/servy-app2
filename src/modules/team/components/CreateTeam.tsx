import {useTranslation} from "next-i18next";
import {addTeam} from "../services/TeamService";
import {PropsWithChild} from "../../../common/models/Props";
import useForm from "../../../common/hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {teamSelector,addTeams,createTeam,setState} from "../services/TeamSlice";
import {authSelector} from "../../auth/services/AuthSlice";

interface TeamForm{
    name:string
}

function CreateTeam(props:PropsWithChild) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authSelector);
    const [form,formChanged,_]=useForm({name:""});

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            form.owner_id=auth.value?.id
            form.members_id=[
                auth.value?.id
            ]
            const team = await addTeam(form);
            //dispatch(createTeam(team))
        } catch (e) {
            dispatch(setState((e as Error).message))
        }

        props.func(false);
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">{t('Name')}</label>
            <input type="text" name={'name'} placeholder={t('Write the name of the team')} required={true} value={form.name} onChange={formChanged}/>
        </div>

        <div>
            <button className={'btn-gradient blue-background-button mt-5'}>{t('Add team')}</button>
        </div>
    </form>
}

export default CreateTeam
