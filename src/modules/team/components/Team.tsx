import {PropsTeam} from "../../../common/models/Props";
import {useAppDispatch, useAppSelector} from "../../../common/redux/hooks";
import {selectedTeam, teamSelector} from "../services/TeamSlice";
import {useEffect, useState} from "react";

function Team({team,...props}: PropsTeam) {
    const teams = useAppSelector(teamSelector);
    const dispatch=useAppDispatch();
    const [color,setColor]=useState('bg-white text-theme-primary')
    useEffect(()=>{
        if (teams.selected && teams.selected.id===team.id){
            setColor('bg-yellow-500 text-white');
        }else{
            setColor('bg-white text-theme-primary');
        }
    },[teams.selected]);

    function select() {
        dispatch(selectedTeam(team))
    }


    return <button className={color+' rounded-md h-14 w-full flex justify-center items-center capitalize'} onClick={select}>
            <span>{team.name.at(0)}</span>
    </button>
}

export default Team
