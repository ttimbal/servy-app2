import {IMember} from "../models/ITeam";
import {useTranslation} from "next-i18next";

type Props={
    member:IMember
}

function Member(props: Props) {
    const {t} = useTranslation();
    const member:IMember=props.member;
    const dateAdded:string=member.date_added.substring(0,10).replaceAll('-','/');

    return <div className={'flex gap-3 items-center'}>
        <img src={member.image_profile} alt={member.username+'-profile'} className={'rounded-full w-8 h-8 object-cover'}/>
        <div>
            <span className={'block'}>{member.username}</span>
            <span className={'block text-theme-gray text-xs font-semibold'}>{t('Date added')} {dateAdded}</span>
        </div>
    </div>
}

export default Member
