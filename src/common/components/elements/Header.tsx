import Search from "./Search";
import {useEffect, useState} from "react";
import {User} from "../../models/User";
import {useAppSelector} from "../../redux/hooks";
import {authSelector} from "../../../modules/auth/services/AuthSlice";
import Link from "next/link";

function Header(props: any) {
    const auth = useAppSelector(authSelector);

    return <header className={'h-14 flex justify-between'}>
        <Search/>
        {
            !!auth.value &&
            <div className={'flex gap-5'}>
                <button className={'h-14 w-14 p-0 shadow-lg hover:bg-theme-primary text-theme-primary-light hover:text-theme-gray'}>
                <Link href={'/app/dashboard'}>
                    <i className="uil uil-apps w-full text-4xl"></i>
                </Link>
                </button>

                <button className={'h-14 w-14 rounded-full p-0 shadow-lg'}>
                    <img src={auth.value.photoURL} alt="" className={'rounded-full'}/>
                </button>
            </div>
        }
    </header>
}

export default Header
