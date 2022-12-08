import Database from "./Database";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import Modal from "../../../common/components/elements/Modal";
import {IDatabase} from "../models/IDatabase";
import CreateDatabase from "./CreateDatabase";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {databaseSelector, setDatabases} from "../services/DatabaseSlice";
import {STATE_LOADING} from "../../../common/models/State";
import {listenDatabases} from "../services/DatabaseService";
import {authSelector} from "../../auth/services/AuthSlice";
import {teamSelector} from "../../team/services/TeamSlice";

function DatabaseList(props: any) {
    const {t} = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const dispatch=useAppDispatch()
    const databases = useAppSelector(databaseSelector);
    const teams = useAppSelector(teamSelector);

    useEffect(() => {
        if (teams.selected !== undefined) {
            const unsubscribe = listenDatabases(teams.selected.id, (databases: IDatabase[]) => {
                dispatch((setDatabases(databases)));
            });

            return () => unsubscribe();
        }
    }, [teams.selected])

    return <>
        <div className={'flex gap-3'}>
            <h2>{t('Databases')}</h2>
            <button className={'bg-theme-primary p-1 flex justify-center items-center'}
                    onClick={(e) => setOpenModal(true)}>
                <i className="uil uil-plus text-white text-2xl"></i>
            </button>
        </div>
        <div className={'grid grid-cols-5 gap-5'}>
            {databases.status===STATE_LOADING && <i className="uil uil-spinner-alt text-center animate-spin text-3xl text-yellow-500"></i>}
            {databases.value.map((database: IDatabase, index: number) => {
                return <Database key={index} database={database}/>
            })}

            {openModal && <Modal title={t('Create database')} func={setOpenModal}>
                <CreateDatabase func={setOpenModal}/>
            </Modal>}

        </div>
    </>
}

export default DatabaseList
