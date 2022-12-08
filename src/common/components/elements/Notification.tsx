import {STATE_FAILURE, STATE_SUCCESS, STATE_WARNING} from "../../models/State";

type Props={
    title:string,
    description:string,
    type:string,
    callback:Function
}

function Notification(props: Props) {
    let BACKGROUND = new Map<string, string>([
        [STATE_FAILURE, "bg-red-500"],
        [STATE_SUCCESS, "bg-green-500"],
        [STATE_WARNING, "bg-orange-500"]
    ])

    return <div className="absolute top-0 right-0 z-50 flex justify-center items-start overflow-auto">
        <div className={BACKGROUND.get(props.type)+' mt-20 min-w-1/3 p-5 divide-y rounded-md'}>
            <div className="flex justify-between">
                <h2 className="text-theme-primary">{props.title}</h2>
                <i className="uil uil-multiply text-gray-300 hover:text-black" onClick={() => props.callback(false)}></i>
            </div>

        </div>
    </div>
}

export default Notification
