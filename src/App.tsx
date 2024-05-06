import styles from "./APP.module.css"
import DetallesClima from "./componets/DetallesClima/DetallesClima"
import Form from "./componets/Form/Form"
import Spinner from "./componets/Spinner/Spinner"
import Alert from "./componets/alert/Alert"
import useWeather from "./hooks/useWeather"


function App() {
  const { fetchWeather, noEncontrado, cargando, weather, hasWheaterData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima TAG TECNOLOGY</h1>

      <div className={styles.container}>
        <Form
          fetchWather={fetchWeather}
        />

        {cargando && <Spinner/>}

        {hasWheaterData && <DetallesClima weather={weather}/>}
        {noEncontrado && <Alert>Ciudad no encontrada</Alert> }


      </div>
    </>
  )
}

export default App
