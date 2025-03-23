"use client"

import { useState } from "react"
import { getGeolocationAndCurrentWeather} from "@/lib/weather-functions"
import { weatherDataType } from "@/lib/types/weather-data-type"
import { WeatherComponent } from "@/components/weather-component"
import Link from "next/link"

export default function App() {
  const [ city, setCity ] = useState("")
  const [ weatherData, setWeatherData ] = useState<weatherDataType<string> | null>()

  async function handlePress() {
    const data = await getGeolocationAndCurrentWeather(city);
    setWeatherData(data)   
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl font-bold">weather app</div>
      <div>
        <input type="text" placeholder="Enter a city..." 
          className="border border-white m-2 p-2 rounded-2xl" 
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              handlePress()
            }
          }}
          onChange={(e) => {
            setCity(e.target.value)
          }} />
        <button className="border border-white p-2 rounded-2xl cursor-pointer" onClick={async () => {
          handlePress()      
        }}>Submit</button>      
      </div>
      <div className="flex border border-white m-2 p-3 rounded-2xl items-center" hidden={!weatherData}>
        <WeatherComponent content={
          <div className="p-6">
            {Array.isArray(weatherData?.weather) ? `${weatherData?.weather[0]?.main} (${weatherData?.weather[0]?.description})`: ""}
          </div>} />
          <WeatherComponent content={(
            <div className="p-3">
              <div>{weatherData?.main?.temp ? `${weatherData?.main?.temp}°C`: ""}</div>
              <div>{weatherData?.main?.feels_like ? `Feels like ${weatherData?.main?.feels_like}°C`: ""}</div>
            </div>
          )} />     
        <WeatherComponent content={(
          <div className="p-3">
            <div>{weatherData?.wind?.speed ? `Wind speed: ${weatherData.wind.speed}m/h`: ""}</div>
            <div>{weatherData?.wind.deg ? `Wind direction: ${weatherData.wind.deg}°`: ""}</div>
          </div>
        )}/>        
        <WeatherComponent content={(
          <div className="p-6">
            <div>{weatherData?.main?.pressure ? `Pressure: ${weatherData.main.pressure}hPa`: ""}</div>
          </div>
        )} />
        <WeatherComponent content={(
          <div className="p-6">
            <div>{weatherData?.clouds?.all !== undefined ? `Cloudiness: ${weatherData.clouds.all}%`: ""}</div>
          </div>
        )} />
      </div>
      <div className="text-white">Made by cat</div>
      <Link className="text-gray-400" href={"https://github.com"}>View on GitHub</Link> {/* add a working repo link here once its made */}
    </main>
  )
}

{/* todo (more practice): add more info with divs to the screen */}
{/* todo: optimize the code */}
{/* optional todo: add other language support */}