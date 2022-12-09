import React, { useState } from "react";

type Props = { handleLogin: (email: string, password: string) => void }

const Login: React.FC<Props> = ({ handleLogin }) => {

    const [ form, setForm ] = useState({ email: "", password: "" });

    const onFormInputChange = (event: any) => {

        const { name, value } = event.target;

        setForm({ ...form, [name]: value });

    }

    const onSubmit = async (event: any) => {

        event.preventDefault();

        if (form.email == "" || form.password == "") return;
        
        handleLogin(form.email, form.password);

    }

    return (
        <div>
            <form>
                <input type="text" name="email" id="email" value={form.email} onChange={onFormInputChange} />
                <input type="password" name="password" id="password" value={form.password} onChange={onFormInputChange} />
                <button onClick={onSubmit}>Login</button>
            </form>
        </div>
    )

}

export default Login;