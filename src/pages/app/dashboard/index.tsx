import ProjectList from "../../../modules/projects/components/ProjectList";
import {useTranslation} from "next-i18next";
import DatabaseList from "../../../modules/database/components/DatabaseList";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Index(props: any) {
    const {t} = useTranslation();
    return (
        <div className={'h-full w-full'}>
                    <div className={'flex flex-col gap-5'}>
                        <ProjectList/>
                    </div>
                    <div className={'flex flex-col gap-5 mt-10'}>
                        <DatabaseList/>
                    </div>
        </div>
);
}

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}
