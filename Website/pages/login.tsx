import { useCallback, useEffect, useState } from "react";

import { Credentials as RealmCredentials } from "realm-web";

import { useRouter } from "next/router";

import { useAppSelector } from "../utilities/hooks";

import { selectRealmApp } from "../store/realm";

import Layout from "../components/layout";

import LoginComponent from "../components/auth/login";

import SignupComponent from "../components/auth/signup";

const Login: NextPageWithLayout = () => {

    const router = useRouter();

    const [ email, setEmail ] = useState("");

    const realmApp = useAppSelector(selectRealmApp);

    const redirect = useCallback((redirectTo?: string) => router.push(redirectTo ? redirectTo : "/", undefined, { shallow: true }), [ router ]);
    
    const handleLogin = (email: string, password: string) => {

        realmApp.logIn(RealmCredentials.emailPassword(email, password))
            .then(() => redirect())
            .catch((error) => console.error(error));

    }

    const handleSignup = (email: string, password: string) => {

        realmApp.emailPasswordAuth.registerUser({ email, password })
            .then(() => {

            }).catch((error) => console.error(error));

    }

    const handleResetPassword = () => realmApp.emailPasswordAuth.sendResetPasswordEmail({ email });

    useEffect(() => {

        if (realmApp.currentUser && realmApp.currentUser.providerType == "local-userpass") {

            redirect();

        }

    }, [ realmApp, redirect ]);

    return (
        <div>
            <h1>Login</h1>
            <LoginComponent handleLogin={handleLogin} />
            <h1>Signup</h1>
            <SignupComponent handleSignup={handleSignup} />
            <h1>Reset Password</h1>
            <span>Type your email below, click the button and check your email</span>
            <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    )

}

Login.getLayout = (page) => <Layout>{page}</Layout>

export default Login;