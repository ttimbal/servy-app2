import Project from "./Project";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import Modal from "../../../common/components/elements/Modal";
import {IProject} from "../models/IProject";
import CreateProject from "./CreateProject";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {projectSelector, setProjects} from "../services/ProjectSlice";
import {STATE_LOADING} from "../../../common/models/State";
import {listenProjects} from "../services/ProjectService";
import {teamSelector} from "../../team/services/TeamSlice";

function ProjectList(props: any) {
    const {t} = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const dispatch=useAppDispatch()
    const projects = useAppSelector(projectSelector);
/*    const teams = useAppSelector(teamSelector);

    useEffect(() => {
        if (teams.selected!==undefined) {
            const unsubscribe = listenProjects(teams.selected.id, (projects: IProject[]) => {
                dispatch((setProjects(projects)));
            });

            return () => unsubscribe();
        }
    }, [teams.selected])*/

    return <>
        <div className={'flex gap-3'}>
            <h2>{t('Projects')}</h2>
            <button className={'bg-theme-primary p-1 flex justify-center items-center'}
                    onClick={(e) => setOpenModal(true)}>
                <i className="uil uil-plus text-white text-2xl"></i>
            </button>
        </div>

        <div className={'grid grid-cols-5 items-center gap-5'}>
            {projects.status===STATE_LOADING && <i className="uil uil-spinner-alt text-center animate-spin text-3xl text-yellow-500"></i>}
            {projects.value.map((project: IProject, index: number) => {
                return <Project key={index} project={project}/>
            })}

            {openModal && <Modal title={t('Create project')} func={setOpenModal}>
                <CreateProject func={setOpenModal}/>
            </Modal>}
        </div>
    </>
}

export default ProjectList
