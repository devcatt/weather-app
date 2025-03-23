import { weatherDataType } from "./types/weather-data-type";

const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY 
const wait = async (time: number) => {await new Promise(resolve => setTimeout(resolve, time))};

export async function getGeolocationAndCurrentWeather(city: string): Promise<weatherDataType<string> | null> {
    let weatherData: weatherDataType<string> | null = null;

    const getCurrentWeather = async (lat: number, lon: number) => {
        const currentWeatherApiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
        await wait(1000)
        const response = await fetch(currentWeatherApiLink)
        if(response) {
            return await response.json();
        } else {
            return null;
        }
    }
    
    const getGeolocation = async (city: string) => {
        const coordinatesApiLink = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherApiKey}`
        await wait(1000)
        const response = await fetch(coordinatesApiLink)
        console.log(response)
        try {
            const coordinatesApiJsonResponse = await response.json();
            const cityData = coordinatesApiJsonResponse[0];
            if(cityData) {
                const cityCoordinates = {lat: cityData.lat, lon: cityData.lon};
                weatherData = await getCurrentWeather(cityCoordinates.lat, cityCoordinates.lon);
            } else {
                return null;
            }
        } catch(error) {
            console.error(error);
            return null;
        }
    }
    await getGeolocation(city)
    weatherData ? console.log(weatherData): console.log("couldn't get city")
    return weatherData
}