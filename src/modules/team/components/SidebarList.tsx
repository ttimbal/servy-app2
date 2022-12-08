import MemberList from "./MemberList";
import {useTranslation} from "next-i18next";
import RepositoryList from "../../repository/components/RepositoryList";
import {useState} from "react";
import Modal from "../../../common/components/elements/Modal";
import CreateMember from "./CreateMember";
import {useAppSelector} from "../../../common/redux/hooks";
import {authSelector} from "../../auth/services/AuthSlice";
import {teamSelector} from "../services/TeamSlice";

function SidebarList(props: any) {
    const {t} = useTranslation();
    const auth = useAppSelector(authSelector);
    const teams = useAppSelector(teamSelector);
    const [openModal, setOpenModal] = useState(false);

    function addMemberIcon() {
        if (!!auth.value && !!teams.selected) {
            if (auth.value.id === teams.selected.owner_id) {
                return <i className="uil uil-user-plus text-theme-primary cursor-pointer text-2xl"
                          onClick={(e) => setOpenModal(true)}></i>
            }
        }
        return <></>
    }

    return <>
        <div className={'bg-white h-full w-56 rounded-md p-5 space-y-8 overflow-y-auto'}>
            <div className={'flex flex-col gap-3'}>
                <h3>{t('Members')} {addMemberIcon()}</h3>
                <MemberList/>
            </div>
            <div className={'flex flex-col gap-3'}>
                <h3>{t('Repositories')} <i className="uil uil-code-branch text-theme-primary"></i></h3>
                <RepositoryList/>
            </div>

        </div>
        {openModal && <Modal title={t('Create team')} func={setOpenModal}>
            <CreateMember func={setOpenModal}/>
        </Modal>}
    </>
}

export default SidebarList
