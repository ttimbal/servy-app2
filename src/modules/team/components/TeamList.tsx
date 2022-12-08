import {useEffect, useState} from "react";
import {ITeam} from "../models/ITeam";
import Modal from "../../../common/components/elements/Modal";
import {useTranslation} from "next-i18next";
import CreateTeam from "./CreateTeam";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {listenTeams} from "../services/TeamService";
import {teamSelector, addTeams} from "../services/TeamSlice";
import Team from "./Team";
import {STATE_LOADING} from "../../../common/models/State";
import {authSelector} from "../../auth/services/AuthSlice";

function TeamList(props: any) {
    const {t} = useTranslation();
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useAppDispatch();
    const teams = useAppSelector(teamSelector);
    const auth = useAppSelector(authSelector);

    useEffect(() => {
        const user = auth.value
        if (user !== null) {
            const unsubscribe = listenTeams(user.id, (teams: ITeam[]) => {
                dispatch(addTeams(teams));
            });

            return () => unsubscribe();
        }
    }, [auth.value]);


    return <div className={'flex flex-col items-center p-2 gap-2'}>
        {teams.status === STATE_LOADING &&
            <i className="uil uil-spinner-alt text-center animate-spin text-3xl text-yellow-500"></i>}
        {teams.value.map((team: ITeam, index: number) => {
            return <Team key={index} team={team}/>
        })}
        <button className={'h-14 w-full bg-theme-gray/20 flex justify-center items-center'}
                onClick={(e) => setOpenModal(true)}>
            <i className="uil uil-plus text-white text-3xl"></i>
        </button>
        {openModal && <Modal title={t('Create team')} func={setOpenModal}>
            <CreateTeam func={setOpenModal}/>
        </Modal>}
    </div>
}

export default TeamList
