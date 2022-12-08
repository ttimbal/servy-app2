import { useState } from "react";

const useForm = (initialState:any) => {
    const [form, setForm] = useState(initialState);

    const formChange = (e:any) => {
        setForm((form:any) => (
            {
                ...form,
                [e.target.name]: e.target.value
            }
        ));
    }

    const clear = () => {
        setForm(initialState);
    }

    return [
        form,
        formChange,
        clear
    ]
}

export default useForm;