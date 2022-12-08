import {useTranslation} from "next-i18next";

export default function Search(props: any) {
    const {t} = useTranslation();
    return (
        <div className="relative w-1/2">
            <input type="search" id="default-search"
                   className="block p-4 text-sm border-0"
                   placeholder={t('Search...')} required/>

            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                <i className="uil uil-search text-theme-primary text-xl"></i>
            </div>
        </div>
    );
}
