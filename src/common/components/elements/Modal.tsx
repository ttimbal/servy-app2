import {PropsWithChild} from "../../models/Props";

function Modal(props:PropsWithChild) {
    return <div className="absolute top-0 left-0 bg-slate-300 bg-opacity-50 z-50 h-full w-full flex justify-center items-start overflow-auto">
        <div className="bg-white mt-20 min-w-1/3 p-5 divide-y rounded-md">
            <div className="flex justify-between">
                <h2 className="text-theme-primary">{props.title}</h2>
                <i className="uil uil-multiply text-gray-300 hover:text-black" onClick={()=>props.func(false)}></i>
        </div>
        <div className="pt-4">
            {props.children}
        </div>
    </div>
</div>
}

export default Modal
