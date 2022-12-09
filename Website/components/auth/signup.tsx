import React, { useState } from "react";

type Props = { handleSignup: (email: string, password: string) => void }

const Signup: React.FC<Props> = ({ handleSignup }) => {

    const [ form, setForm ] = useState({ email: "", password: "" });

    const [ confirmPassword, setConfirmPassword ] = useState("");

    const onFormInputChange = (event: any) => {

        const { name, value } = event.target;

        setForm({ ...form, [name]: value });

    }

    const onSubmit = async (event: any) => {

        event.preventDefault();

        if (form.password == "" || confirmPassword == "" || form.password !== confirmPassword) return;

        handleSignup(form.email, form.password);

    }

    return (
        <div>
            <form>
                <input type="text" name="email" id="email" value={form.email} onChange={onFormInputChange} />
                <input type="password" name="password" id="password" value={form.password} onChange={onFormInputChange} />
                <input type="confirmPassword" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.currentTarget.value)} />
                <p hidden={form.password != "" && form.password != confirmPassword}>Passwords dont match</p>
                <button onClick={onSubmit}>Signup</button>
            </form>
        </div>
    )

}

export default Signup;