import Image from 'next/image'
import databaseImage from '../../../assets/database.png'
import {PropsDatabase} from "../../../common/models/Props";

function Database({database,...props}:PropsDatabase) {
    return <div className={'bg-white rounded-md w-48 p-3'}>
        <Image src={databaseImage} alt="" className={'aspect-square'} />
        <span className={'block text-center text-theme-primary font-semibold'}>{database.type}</span>
    </div>
}

export default Database
