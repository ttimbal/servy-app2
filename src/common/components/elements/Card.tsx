import {PropsWithChild} from "../../models/Props";

function Card(props:PropsWithChild){

    return <div className={`bg-white rounded-md p-10 ${props.className}`}>
        {props.children}
    </div>
}

export default Card
