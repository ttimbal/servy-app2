import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Index(props: any) {
    const { t, i18n } = useTranslation();
}

export async function getStaticProps({ locale }:any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}
