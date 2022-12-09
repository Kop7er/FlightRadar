import { useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import { useAppSelector } from "../utilities/hooks";

import { selectRealmApp } from "../store/realm";

const ConfirmEmail: NextPageWithLayout = () => {

    const router = useRouter();

    const realmApp = useAppSelector(selectRealmApp);

    const token = router.query.token as string;

    const tokenId = router.query.tokenId as string;

    const redirect = useCallback((redirectTo?: string) => router.push(redirectTo ? redirectTo : "/", undefined, { shallow: true }), [ router ]);

    useEffect(() => {

        if (token && tokenId) {

            realmApp?.emailPasswordAuth.confirmUser({ token, tokenId })
                .then(() => redirect("/login"))
                .catch(() => redirect());

        } else redirect();

    }, [ token, tokenId, realmApp, redirect ]);

    return null;

}

export default ConfirmEmail;