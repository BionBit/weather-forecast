import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, VStack, Input, Button, useToast } from '@chakra-ui/react';

import {WeatherChart} from '../../components/charts/WeatherForecast';
import {WeatherService} from '../../services/weather-service';
import {useDeepCompareEffect} from '../../utils/hooks';

export const WeatherSearchForecast = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const toast = useToast();
  
    useDeepCompareEffect(() => {
        const { city } = router.query;
        if (city) {
            setCity(city);
            fetchWeatherData(city);
        }
    }, [router.query]);

    const fetchWeatherData = async (cityName) => {
        setLoading(true);
        try {
            const geoData = await WeatherService.getGeoData(cityName);

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error('City not found');
            }

            const { latitude, longitude } = geoData.results[0];
            const weatherData = await WeatherService.getWeatherData(latitude, longitude);

            setWeatherData(weatherData);
            router.push(`/?city=${cityName}`);
        } catch (error) {
            toast({
                title: 'Error',
                status: 'error',
                description: error.message || 'Failed to fetch weather data, please try again.',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            fetchWeatherData(city);
        }
    };

    return (
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={4} width="100%" maxWidth="600px">
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        size="lg"
                    />
                    <Button
                        mt={2}
                        colorScheme="blue"
                        isLoading={loading}
                        type="submit"
                        width="100%"
                    >
                        Get Weather
                    </Button>
                </form>

                {weatherData && <WeatherChart data={weatherData} />}
            </VStack>
        </Box>
    );
};