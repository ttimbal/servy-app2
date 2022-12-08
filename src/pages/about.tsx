import Image from "next/image";

import mirandaImage from "../assets/jose-luis-miranda.jpg";
import coyoImage from "../assets/jose-luis-miranda.jpg";
import React from "react";
import {useTranslation} from "next-i18next";
import Link from "next/link";

function About(props: any) {
    const {t, i18n} = useTranslation();
    return <div className={'h-screen'}>
        <div className={'grid grid-cols-2 justify-items-center mt-20 gap-10'}>

            <div className={'flex flex-col items-center w-1/2'}>
                <div className={'bg-white rounded-md w-48 p-3'}>
                    <Image src={mirandaImage} alt="" className={'aspect-square'}/>
                </div>
                <span className={'block text-center text-white font-semibold mt-2'}>{t('JOSE LUIS MIRANDA')}</span>
                <div className={'flex justify-center gap-5'}>
                    <Link href={'https://www.linkedin.com/in/jl-mirandav/'}>
                        <i className="uil uil-linkedin text-2xl text-white cursor-pointer"></i>
                    </Link>

                    <Link href={'mailto:timbal.tmb@gmail.com'}>
                        <i className="uil uil-envelope text-2xl text-white cursor-pointer"></i>
                    </Link>
                </div>

                <p className={'text-white mt-5'}>{t('UAGRM')}</p>
                <p className={'text-white mt-5'}>{t('Software Developer')}</p>

            </div>

            <div className={'flex flex-col items-center w-1/2'}>
                <div className={'bg-white rounded-md w-48 p-3'}>
                    <Image src={coyoImage} alt="" className={'aspect-square'}/>
                </div>
                <span className={'block text-center text-white font-semibold mt-2'}>{t('JHONATAN WILSON COYO')}</span>
                <div className={'flex justify-center gap-5'}>
                    <Link href={'https://www.linkedin.com/in/jhonatan-wilson-coyo-leon-377314205/'}>
                        <i className="uil uil-linkedin text-2xl text-white cursor-pointer"></i>
                    </Link>

                    <Link href={'mailto:wilsoncoyoleon@gmail.com'}>
                        <i className="uil uil-envelope text-2xl text-white cursor-pointer"></i>
                    </Link>
                </div>

                <p className={'text-white mt-5'}>{t('UAGRM')}</p>
                <p className={'text-white mt-5'}>{t('Software Developer')}</p>
            </div>
        </div>
    </div>
}

export default About
