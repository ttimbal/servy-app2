import {PropsWithChild} from "../../models/Props";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {authSelector, saveUser} from "../../../modules/auth/services/AuthSlice";
import {getCurrentAuthUser, getUserSaved, onAuthChanged} from "../../../modules/auth/services/AuthService";

import {useEffect} from "react";
import {useRouter} from "next/router";
import {User} from "../../models/User";
import Sidebar from "../elements/Sidebar";
import TeamList from "../../../modules/team/components/TeamList";
import SidebarList from "../../../modules/team/components/SidebarList";
import Header from "../elements/Header";
import {teamSelector} from "../../../modules/team/services/TeamSlice";
import {listenProjects} from "../../../modules/projects/services/ProjectService";
import {IProject} from "../../../modules/projects/models/IProject";
import {setProjects} from "../../../modules/projects/services/ProjectSlice";

export default function AppLayout(props: PropsWithChild) {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authSelector);
    const router = useRouter();
    const teams = useAppSelector(teamSelector);

    useEffect(() => {
        if (auth.value === null) {
            onAuthChanged(async (user: any) => {
                if (user === null) {
                    await router.push("/auth/signin");
                } else {
                    const userSaved: User | undefined = await getUserSaved(user.uid);
                    if (!!userSaved) {
                        dispatch(saveUser(userSaved))
                    }
                }
            });
        }
    }, []);

    useEffect(() => {
        if (teams.selected!==undefined) {
            const unsubscribe = listenProjects(teams.selected.id, (projects: IProject[]) => {
                dispatch((setProjects(projects)));
            });

            return () => unsubscribe();
        }
    }, [teams.selected])

    return <main className={'bg-theme-gray'}>
        <div className={'flex h-screen'}>
            <Sidebar>
                <TeamList/>
            </Sidebar>
            <div className={'grow flex gap-5 p-5 pr-0'}>
                <SidebarList/>
                <div className={'flex flex-col grow pr-5 overflow-auto gap-5'}>
                    <Header/>
                    {props.children}
                </div>
            </div>

        </div>
    </main>
}
