import Head from 'next/head';

import { WeatherSearchForecast } from '../components/widgets/WeatherSearchForecast';

export default function Home() {
    return (
        <>
            <Head>
                <title>Weather Forecast</title>
                <meta name="description" content="Weather forecast application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WeatherSearchForecast />
        </>
    );
}