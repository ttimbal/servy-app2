import React from 'react';
import Image from "next/image";
import nodeImage from "../assets/node.png";
import databaseImage from "../assets/database.png";
import devopsImage from "../assets/devops.png";
import {useTranslation} from "next-i18next";

const Home = () => {
    const {t, i18n} = useTranslation();
    
    return (
        <>
            <div className={'flex flex-col justify-center my-10 w-full h-screen items-center gap-5'}>
                <svg width="528" height="236" viewBox="0 0 228 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M183.825 51.34C177.365 22.015 148.58 0 114 0C86.545 0 62.7 13.94 50.825 34.34C22.23 37.06 0 58.735 0 85C0 113.135 25.555 136 57 136H180.5C206.72 136 228 116.96 228 93.5C228 71.06 208.525 52.87 183.825 51.34Z"
                        fill="white"/>
                    <path
                        d="M149.516 76.5156L117.172 44.1719C115.609 42.6094 113.078 42.6094 111.516 44.1719L104.75 50.9219L111.766 57.9375C112.547 57.5781 113.422 57.3438 114.344 57.3438C117.656 57.3438 120.344 60.0312 120.344 63.3438C120.344 64.2656 120.109 65.125 119.734 65.9219L127.766 73.9375C128.547 73.5781 129.422 73.3438 130.344 73.3438C133.656 73.3438 136.344 76.0312 136.344 79.3438C136.344 82.6562 133.656 85.3438 130.344 85.3438C127.031 85.3438 124.344 82.6562 124.344 79.3438C124.344 78.4219 124.563 77.5625 124.938 76.7656L116.906 68.75C116.734 68.8281 116.531 68.9062 116.344 68.9688V89.7188C118.656 90.5469 120.344 92.7344 120.344 95.3438C120.344 98.6562 117.656 101.344 114.344 101.344C111.031 101.344 108.344 98.6562 108.344 95.3438C108.344 92.7344 110.016 90.5312 112.344 89.7188V68.9688C110.016 68.1406 108.344 65.9531 108.344 63.3438C108.344 62.4219 108.563 61.5625 108.938 60.7656L101.922 53.7656L79.1719 76.5156C77.6094 78.0781 77.6094 80.6094 79.1719 82.1719L111.516 114.516C113.078 116.078 115.609 116.078 117.172 114.516L149.516 82.1719C151.078 80.6094 151.078 78.0781 149.516 76.5156Z"
                        fill="#EC361D"/>
                </svg>

                <div className={'text-white'}>
                    <div className={'flex justify-center'}>
                        <p className={'text-center w-1/2'}>{t('Deploy your applications quickly and without worrying about configuring servers')}</p>
                    </div>
                </div>
            </div>

            <div className={'grid grid-cols-2 justify-items-center mb-72'}>
                <div className={'rounded-md p-3 cursor-pointer h-full flex items-center justify-between'}>
                    <Image src={devopsImage} alt="" className={'aspect-square'}/>
                </div>
                <div className={'w-1/2 flex flex-col items-center justify-center gap-5'}>
                    <h2 className={'text-white text-xl'}>{t('Do you want to streamline the use of your applications and avoid delays?')}</h2>
                    <p className={'text-white'}>{t('Servy is the tool you are looking for, connect your GitHub account and start deploying your projects')}</p>
                </div>
            </div>


            <div className={'grid grid-cols-2 justify-items-center mt-20'}>

                <div className={'flex flex-col items-center justify-center'}>
                    <div className={'bg-white rounded-md w-48 p-3 cursor-pointer'}>
                        <Image src={nodeImage} alt="" className={'aspect-square'}/>

                    </div>
                    <div className={'flex flex-col items-center justify-center w-1/2'}>
                        <span className={'block text-center text-white font-semibold mt-2'}>{t('Nodejs')}</span>
                        <span
                            className={'block text-center text-white font-semibold mt-5'}>{t('With Servy you have the possibility to quickly deploy your Nodejs applications')}</span>
                    </div>
                </div>

                <div className={'flex flex-col items-center justify-center'}>
                    <div className={'bg-white rounded-md w-48 p-3'}>
                        <Image src={databaseImage} alt="" className={'aspect-square'}/>
                    </div>
                    <div className={'flex flex-col items-center justify-center w-1/2'}>
                        <span className={'block text-center text-white font-semibold mt-2'}>{t('Database')}</span>
                        <span
                            className={'block text-center text-white font-semibold mt-5'}>{t('You can also create databases to use in your projects!!')}</span>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;
