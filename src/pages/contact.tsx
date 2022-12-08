import {useTranslation} from "next-i18next";
import whatsappImage from "../assets/whatsapp.png";
import Image from "next/image";
import React from "react";
import emailjs from "emailjs-com";
//import emailjs from '@emailjs/nodejs';
function sendMail(e:any) {
    e.preventDefault()
    const templateParams = {
        name: e.target.name.value,
        message: e.target.message.value
    };
    console.log(templateParams)
    //
    emailjs.send('service_akwzdyd', 'template_hpyrrue', templateParams,'_1Ozp7s8ED57XHUxt')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    //emailjs.sendForm("service_akwzdyd", 'template_hpyrrue', e.target, '_1Ozp7s8ED57XHUxt').then(res=> console.log(res)).catch(e=>console.log(e))

}

function Contact(props: any) {
    const {t, i18n} = useTranslation();

    return <div className={'h-screen flex flex-col items-center justify-center gap-10'}>
        <form className={'w-1/3'} onSubmit={sendMail}>
            <div>
                <label className={'text-white'} htmlFor={'name'}>{t('Name')}</label>
                <input type="text" name={'name'} required={true}/>
            </div>

            <div>
                <label className={'text-white'} htmlFor={'email'}>{t('Email')}</label>
                <input type="email" name={'email'} required={true}/>
            </div>

            <div>
                <label className={'text-white'} htmlFor={'message'}>{t('Message')}</label>
                <textarea name="message" required={true} className={'w-full'} rows={5}></textarea>
            </div>

            <button className={'bg-[#EC361D] w-full mt-5 mb-8 text-white'}>{t('Send')}</button>
        </form>

        <a href={'https://wa.link/nivdee'} className={'rounded-md w-28 rounded-full cursor-pointer'}>
            <Image src={whatsappImage} alt="" className={'rounded-full'}/>
        </a>
        <p className={'text-white'}>{t('Or contact us via whatsapp +59165890904')}</p>
    </div>
}

export default Contact
