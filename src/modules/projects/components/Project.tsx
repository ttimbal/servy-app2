import Image from 'next/image'
import nodeImage from '../../../assets/node.png'
import {PropsProject, PropsWithChild} from "../../../common/models/Props";
import Link from "next/link";

function Project({project,...props}:PropsProject) {
    return <Link href={`project/${project.id}`}>
       <div className={'bg-white rounded-md w-48 p-3 cursor-pointer'} >
           <Image src={nodeImage} alt="" className={'aspect-square'} />
           <span className={'block text-center text-theme-primary font-semibold'}>{project.name}</span>
       </div>
    </Link>
}

export default Project
