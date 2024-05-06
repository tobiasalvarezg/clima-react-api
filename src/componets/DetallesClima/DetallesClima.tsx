import { Weather } from "../../hooks/useWeather"
import {formatTemp} from '../../utils/'
import style from './Detalles.module.css'


type DetallesClimaProps = {

    weather: Weather
}


export default function DetallesClima({ weather }: DetallesClimaProps) {
    return (
        <div className={style.container}>

            <h2>Clima de: {weather.name}</h2>
           
            <p className={style.actual}>Temp Actual: {formatTemp(weather.main.temp)} &deg;C</p>
            <div className={style.ambos}>
                
            <p>Max: <span> {formatTemp(weather.main.temp_max)} &deg;C</span></p>
            <p>Min: <span> {formatTemp(weather.main.temp_min)} &deg;C</span></p>
            

            </div>
      


        </div>
    )
}
