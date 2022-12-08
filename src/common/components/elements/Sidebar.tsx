
import {PropsWithChild} from "../../models/Props";

function Sidebar(props: PropsWithChild) {
    return <div className={'w-16 bg-theme-primary h-screen'}>
        {props.children}
    </div>
}

export default Sidebar
