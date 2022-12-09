import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useAppSelector } from "../utilities/hooks";

import { selectRealmApp } from "../store/realm";

import Layout from "../components/layout";

const ResetPassword: NextPageWithLayout = () => {

    const router = useRouter();

    const realmApp = useAppSelector(selectRealmApp);

    const [ password, setPassword ] = useState("");

    const [ confirmPassword, setConfirmPassword ] = useState("");

    const token = router.query.token as string;

    const tokenId = router.query.tokenId as string;

    const redirect = useCallback((redirectTo?: string) => router.push(redirectTo ? redirectTo : "/", undefined, { shallow: true }), [ router ]);

    const handlePasswordTyping = (event: any) => {

        const { id, value } = event.target;

        if (id === "password") {

            setPassword(value);

        }

        if (id === "confirmPassword") {

            setConfirmPassword(value);

        }

    }

    const handlePasswordReset = (event: any) => {

        event.preventDefault();

        if (password == "" || confirmPassword == "" || password !== confirmPassword) return;

        realmApp.emailPasswordAuth.resetPassword({ password: password, token, tokenId })
            .then(() => redirect("/login"))
            .catch((error) => console.error(error));

    }

    useEffect(() => {

        if (!token || !tokenId) {

            redirect();

        }

    }, [ token, tokenId, redirect ]);

    return (
        <div>
            <h1>Reset Password</h1>
            <form>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" onChange={handlePasswordTyping} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" onChange={handlePasswordTyping} />
                </div>
                <p hidden={password != "" && password != confirmPassword}>Passwords dont match</p>
                <button type="submit" onClick={handlePasswordReset}>Reset Password</button>
            </form>
        </div>
    )

}

ResetPassword.getLayout = (page) => <Layout>{page}</Layout>

export default ResetPassword;