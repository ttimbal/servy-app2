import React, {useEffect, useState} from 'react';
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {createProject, selectProjectByID} from "../../../modules/projects/services/ProjectSlice";
import {getProject} from "../../../modules/projects/services/ProjectService";
import Project from "../../../modules/projects/components/Project";
import Setting from "../../../modules/projects/components/Setting";
import Deploy from "../../../modules/projects/components/Deploy";
import {selectedTeam, setSelectedTeamByID, teamSelector} from "../../../modules/team/services/TeamSlice";


export default function ProjectView(props: any) {
    const {t} = useTranslation();
    const router = useRouter()
    const projectID: any = router.query['projectID'];
    if (!(!!projectID)) {
        router.push('/bashboard')
    }

    const options = [
        "Activities",
        "Resources",
        "Deploy",
        "Settings",
        "Logs"
    ];

    const [menu, setMenu] = useState<string>("Settings")
    const project = useAppSelector(selectProjectByID(projectID))
    const teams = useAppSelector(teamSelector);
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!project && teams.value.length>0) {
            getProject(projectID).then(data => {
                if (data == undefined) {
                    router.push('/bashboard')
                } else {
                    dispatch(setSelectedTeamByID(data.team_id));
                    dispatch(createProject(data))

                }
            })
        }
    }, [teams.value]);

    function getStyleForMenu(option: string): string {
        let style = '';
        if (option === menu) {
            style = style + 'underline decoration-2';
        }
        return style
    }

    return (
        <>
            {!project && <i className="uil uil-spinner-alt text-center animate-spin text-3xl text-yellow-500"></i>}

            {project && <div className={'flex flex-col bg-white grow rounded-md'}>
                <div className={'flex flex-col justify-between bg-theme-primary h-36 rounded-tr-md rounded-tl-md pt-5'}>
                    <h2 className={'text-white text-center'}>{project.name}</h2>
                    <div className={'flex justify-center text-white'}>
                        {options.map((option:string)=>{
                            return <button key={option} className={getStyleForMenu(option)} onClick={()=>setMenu(option)}>{option}</button>
                        })}
                    </div>
                </div>
                <div className={'grow pt-10'}>
                    {menu === 'Settings' && <Setting project={project}/>}
                    {menu === 'Deploy' && <Deploy project={project}/>}
                </div>
            </div>}
        </>
    );
}

export async function getStaticPaths(t: any) {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}
