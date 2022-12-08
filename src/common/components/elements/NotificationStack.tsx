import Notification from "./Notification";
import {STATE_SUCCESS} from "../../models/State";

function NotificationStack(props: any) {
    return <div>
        <Notification title={'Saved'} type={STATE_SUCCESS} callback={()=>console.log("hola")} description={'Success saved'}
        />
    </div>
}

export default NotificationStack
