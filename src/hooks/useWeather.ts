import axios from "axios";
import { useMemo, useState } from "react";
import { SearchType } from "../types";
import {z} from 'zod'

//Zod

const Weather = z.object({

name: z.string(),
main: z.object({
  temp: z.number(),
  temp_max: z.number(),
  temp_min: z.number()
})

})

export type Weather = z.infer<typeof Weather>

const initialState = {

  name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    }

}


export default function useWeather() {
    
  const [weather, setWeather] = useState<Weather>(initialState)
  const[cargando, setCargando] = useState(false)
  const[noEncontrado, setNoEncontrado] = useState(false)

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setCargando(true)
    setWeather(initialState)
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios.get(geoUrl);

      if(!data[0]){
        setNoEncontrado(true)
      return
        
      }


      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      const { data: weatherResult } = await axios.get(weatherURL);
      const result = Weather.safeParse(weatherResult)

      if(result.success){
        setWeather(result.data)

      }


    } catch (error) {
      console.log(error);
    } finally{

      setCargando(false)

    }
  };

  const hasWheaterData = useMemo(()=> weather.name ,[weather])

  return {
    weather,
    cargando,
    fetchWeather,
    hasWheaterData,
    noEncontrado
  };
}
