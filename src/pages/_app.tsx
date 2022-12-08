import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useRouter} from "next/router";
import AuthLayout from "../common/components/layouts/AuthLayout";
import AppLayout from "../common/components/layouts/AppLayout";
import {appWithTranslation} from 'next-i18next';
import Head from "next/head";
import {Provider} from 'react-redux';
import store from '../common/redux/store';
import NotificationStack from "../common/components/elements/NotificationStack";
import LandingLayout from "../common/components/layouts/LandingLayout";


function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();
    let Layout = LandingLayout;

    if (router.pathname.includes('auth', 0)) {
        Layout=AuthLayout
    }

    if (router.pathname.includes('app', 0)) {
        Layout=AppLayout
    }

    return <Provider store={store}>
        <Layout>
            <Head>
                <title>{'Servy'}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"/>
            </Head>
            <Component {...pageProps} />
            {/*<NotificationStack/>*/}
        </Layout>
    </Provider>
}


export default (appWithTranslation(MyApp));
