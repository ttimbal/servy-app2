import Member from "./Member";
import {useAppSelector} from "../../../common/redux/hooks";
import {teamSelector} from "../services/TeamSlice";
import {IMember, ITeam} from "../models/ITeam";
import Team from "./Team";

function MemberList(props: any) {
    const teams = useAppSelector(teamSelector);

    return <div className={'flex flex-col gap-3'}>
        { !!teams.selected && teams.selected.members.map((member: IMember, index: number) => {
            return <Member key={index} member={member}/>
        })}
    </div>
}

export default MemberList
