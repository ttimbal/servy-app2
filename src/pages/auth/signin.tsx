import Card from "../../common/components/elements/Card";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../common/redux/hooks";
import {authSelector, signInAsync, failure} from "../../modules/auth/services/AuthSlice";
import {useEffect} from "react";
import {STATE_AUTHENTICATED, STATE_FAILURE} from "../../common/models/State";

export default function SignIn(props: any) {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const dispatch = useAppDispatch()
    const auth = useAppSelector(authSelector)

    useEffect(()=>{
        if (auth.status===STATE_AUTHENTICATED){
            const ok=router.replace('/app/dashboard');
            if (!ok){
                dispatch(failure(STATE_FAILURE))
            }
        }
    },[auth])

    function signInWithGithub() {
        dispatch(signInAsync())
    }

    return <>
        <Card className={'w-1/2'}>
            <div>
                <h2 className={'text-center font-bold text-2xl text-theme-primary'}>{t('Welcome')}</h2>
                <p className={'text-sm text-center font-semibold text-theme-primary'}>{t('Sign in to your account')}</p>
            </div>


                <button className={'btn-github mt-5 mb-8'} onClick={signInWithGithub}>{t('Sign in with GitHub')}</button>


{/*            <form className={'w-full'}>
                <div>
                    <label htmlFor={'email'}>{t('Email')}</label>
                    <input name={'email'} type="email" placeholder={t('Write your email')}/>
                </div>
                <div>
                    <label htmlFor={'password'}>{t('Password')}</label>
                    <input name={'password'} type="password" placeholder={t('Write your password')}/>
                </div>

                <div>
                    <button className={'btn-gradient blue-background-button mt-5'}>{t('Sign in')}</button>
                </div>
            </form>*/}

        </Card>
    </>
}

export async function getStaticProps({ locale }:any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}