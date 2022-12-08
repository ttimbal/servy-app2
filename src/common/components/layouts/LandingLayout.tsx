import Link from "next/link";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React from "react";

export default function LandingLayout(props: any) {
    const { t, i18n } = useTranslation();

    return <div className={'blue-background h-full'}>
        <header className={'h-16 bg-white flex items-center justify-between px-10 gap-10'}>

            <div className={'flex items-center gap-4'}>
                <svg width="60" height="60" viewBox="0 0 228 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M183.825 51.34C177.365 22.015 148.58 0 114 0C86.545 0 62.7 13.94 50.825 34.34C22.23 37.06 0 58.735 0 85C0 113.135 25.555 136 57 136H180.5C206.72 136 228 116.96 228 93.5C228 71.06 208.525 52.87 183.825 51.34Z" fill="#EC361D"/>
                    <path d="M149.516 76.5156L117.172 44.1719C115.609 42.6094 113.078 42.6094 111.516 44.1719L104.75 50.9219L111.766 57.9375C112.547 57.5781 113.422 57.3438 114.344 57.3438C117.656 57.3438 120.344 60.0312 120.344 63.3438C120.344 64.2656 120.109 65.125 119.734 65.9219L127.766 73.9375C128.547 73.5781 129.422 73.3438 130.344 73.3438C133.656 73.3438 136.344 76.0312 136.344 79.3438C136.344 82.6562 133.656 85.3438 130.344 85.3438C127.031 85.3438 124.344 82.6562 124.344 79.3438C124.344 78.4219 124.563 77.5625 124.938 76.7656L116.906 68.75C116.734 68.8281 116.531 68.9062 116.344 68.9688V89.7188C118.656 90.5469 120.344 92.7344 120.344 95.3438C120.344 98.6562 117.656 101.344 114.344 101.344C111.031 101.344 108.344 98.6562 108.344 95.3438C108.344 92.7344 110.016 90.5312 112.344 89.7188V68.9688C110.016 68.1406 108.344 65.9531 108.344 63.3438C108.344 62.4219 108.563 61.5625 108.938 60.7656L101.922 53.7656L79.1719 76.5156C77.6094 78.0781 77.6094 80.6094 79.1719 82.1719L111.516 114.516C113.078 116.078 115.609 116.078 117.172 114.516L149.516 82.1719C151.078 80.6094 151.078 78.0781 149.516 76.5156Z" fill="white"/>
                </svg>
                <span className={'text-xl font-bold'}>{t('Servy')}</span>
            </div>
            <div className={'flex gap-10'}>
                <Link href={'/home'}>{t('Home')}</Link>
                <Link href={'/contact'}>{t('Contact')}</Link>
                <Link href={'/about'}>{t('About us')}</Link>
                <Link href={'/auth/signin'}>{t('Sign in')}</Link>
            </div>

        </header>
        <div className={'h-full'}>
            {props.children}
        </div>
        <footer className={'h-16 border-2 border-white mt-16 flex justify-around items-center'}>
            <span className={'text-white'}>2022</span>
            <span className={'text-white text-xl font-bold'}>SERVY</span>
            <div>
                <Link href={'https://www.linkedin.com/in/jl-mirandav/'}>
                    <i className="uil uil-linkedin text-2xl text-white cursor-pointer"></i>
                </Link>

                <Link href={'mailto:timbal.tmb@gmail.com'}>
                    <i className="uil uil-envelope text-2xl text-white cursor-pointer"></i>
                </Link>
            </div>
        </footer>
    </div>
}

