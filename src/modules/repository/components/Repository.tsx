import {useTranslation} from "next-i18next";
import {PropsRepo} from "../../../common/models/Props";

function Repository({repo,...props}: PropsRepo) {
    const {t} = useTranslation();
    const lastUpdated=new Date(repo.updated_at);
    const lastUpdatedDate = lastUpdated.getFullYear()+'/'+(lastUpdated.getMonth()+1)+'/'+lastUpdated.getDate();
    return <div className={'flex gap-3 items-center'}>
        <i className="uil uil-github text-2xl"></i>
        <div>
            <a className={'block'} href={repo.html_url}>{repo.name}</a>
            <span className={'block text-theme-gray text-xs font-semibold'}>{t('Last updated')} {lastUpdatedDate}</span>
        </div>
    </div>
}

export default Repository
