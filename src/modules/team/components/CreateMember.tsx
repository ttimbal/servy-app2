import {useTranslation} from "next-i18next";
import {addTeam, addMember} from "../services/TeamService";
import {PropsWithChild} from "../../../common/models/Props";
import useForm from "../../../common/hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {teamSelector, addTeams, createTeam, setState} from "../services/TeamSlice";
import {authSelector} from "../../auth/services/AuthSlice";
import {getUserSavedByUsername} from "../../auth/services/AuthService";
import {User} from "../../../common/models/User";
import {IMember} from "../models/ITeam";


function CreateMember(props: PropsWithChild) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authSelector);
    const teams = useAppSelector(teamSelector);
    const [form, formChanged, _] = useForm({username: ""});

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            const user: User | undefined = await getUserSavedByUsername(form.username);
            if (user !== undefined && teams.selected!==undefined) {
                const member: IMember = {
                    id: user.id,
                    date_added: new Date().toISOString(),
                    image_profile: user.photoURL,
                    username: user.username
                }
                await addMember(teams.selected.id,member)
            }else{
                console.log('Not found');
            }
        } catch (e) {
            dispatch(setState((e as Error).message))
        }

        props.func(false);
    }

    return <>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">{t('Username')}</label>
                <input type="text" name={'username'} placeholder={t('Write the username')} required={true}
                       value={form.username} onChange={formChanged}/>
            </div>

            <div>
                <button className={'btn-gradient blue-background-button mt-5'}>{t('Add member')}</button>
            </div>
        </form>
    </>
}

export default CreateMember
