import Image from 'next/image'
import databaseImage from '../../../assets/database.png'
import {PropsDatabase} from "../../../common/models/Props";
import {useState} from "react";
import Modal from "../../../common/components/elements/Modal";
import {useTranslation} from "next-i18next";


function Database({database, ...props}: PropsDatabase) {
    const {t} = useTranslation();
    const [openModal, setOpenModal] = useState(false);

    function handleClick(e: any) {
        console.log("clicked")
        setOpenModal(true)
    }


    return <>
        <div className={'bg-white rounded-md w-48 p-3 cursor-pointer'} onClick={handleClick}>
            <Image src={databaseImage} alt="" className={'aspect-square'}/>
            <span className={'block text-center text-theme-primary font-semibold'}>{database.type}</span>
        </div>
        {openModal && <Modal title={t('Credentials')} func={setOpenModal}>
            {!!database.credentials ?
                <div>
                    <div>
                        <label htmlFor={'host'}>{t('Host')}</label>
                        <input type="text" name={'host'} disabled={true} value={database.credentials.host}/>
                    </div>
                    <div>
                        <label htmlFor={'port'}>{t('Port')}</label>
                        <input type="text" name={'port'} disabled={true} value={database.credentials.port}/>
                    </div>
                    <div>
                        <label htmlFor={'username'}>{t('Username')}</label>
                        <input type="text" name={'username'} disabled={true} value={database.credentials.username}/>
                    </div>
                    <div>
                        <label htmlFor={'password'}>{t('Password')}</label>
                        <input type="text" name={'password'} disabled={true} value={database.credentials.password}/>
                    </div>
                </div> :
                <div className={'flex flex-col justify-center items-center'}>
                    <i className="uil uil-spinner-alt text-center animate-spin text-3xl text-yellow-500"></i>
                    <span>{t('Creating resources...')}</span>
                </div>
            }
        </Modal>}
    </>
}

export default Database
