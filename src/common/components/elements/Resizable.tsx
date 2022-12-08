import {useState} from "react";

function Resizable(props: any) {
    const [initialPos,   setInitialPos] = useState<any>();
    const [initialSize, setInitialSize] = useState<any>();

    const initial = (e:any) => {

        let resizable = document.getElementById('Resizable');

        setInitialPos(e.clientX);
        setInitialSize(resizable?.offsetWidth);

    }

    const resize = (e:any) => {

        let resizable = document.getElementById('Resizable');
        if (resizable) {
            resizable.style.width = `${parseInt(initialSize) + parseInt(e.clientX) - parseInt(initialPos)}px`;
        }

    }

    return(
        <div className = 'Block'>
            <div id = 'Resizable'/>
            <div id = 'Draggable'
                 draggable   = 'true'
                 onDragStart = {initial}
                 onDrag      = {resize}
            />
        </div>
    );
}

export default Resizable
