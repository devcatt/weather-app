"use client"

import { useState } from "react"
import { getGeolocationAndCurrentWeather} from "@/components/weather-functions"
import { weatherDataType } from "../components/types/weather-data-type"

export default function App() {
  const [ city, setCity ] = useState("")
  const [ weatherData, setWeatherData ] = useState<weatherDataType<string | void>>()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      weather app
      <div>
        <input type="text" placeholder="Enter your city..." 
          className="border border-white m-2 p-2 rounded-2xl" 
          onChange={(e) => {
            setCity(e.target.value)
        }} />
        <button className="border border-white p-2 rounded-2xl cursor-pointer" onClick={async () => {
          const data = await getGeolocationAndCurrentWeather(city);
          setWeatherData(await data)          
        }}>Submit</button>      
      </div>
      <div hidden={weatherData ? false: true}>
        <div className="border border-white m-2 p-2 rounded-2xl">
          <div>{weatherData?.main?.temp ? `${weatherData?.main?.temp}°C`: ""}</div>
          <div>{weatherData?.main?.feels_like ? `Feels like ${weatherData?.main?.feels_like}°C`: ""}</div>
        </div>
        <div className="border border-white m-2 p-2 rounded-2xl">{
        Array.isArray(weatherData?.weather) ? `${weatherData?.weather[0]?.main} (${weatherData?.weather[0]?.description})`: ""}</div>        
      </div>
    </main>
  )
}

{/* todo (more practice): add more info with divs to the screen */}
{/* todo: optimize the code */}