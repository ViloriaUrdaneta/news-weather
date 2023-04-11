import React, { useState, useEffect } from 'react';
import { todayScore } from '../APIService/todayScore'
import LastWeek from '../components/lastWeek';
import Today from '../components/pure/today';
import '../App.css';

const Weather = () => {

    const [ data, setData] = useState({ score: 0, hope: '', fear: '', negative: [], positive: [] });

    useEffect(() => {  
        todayScore()
            .then((response) => {
                setData(response)
                console.log('response: ', response)
                })
            .catch((error) => {alert('error en setData: ', error)});                
    },[]);

    let content;

    if (data.score === 0) {
        content = (
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        );
    } else{
        content = (
            <div>
                <h1 className='display-2 mt-5'>
                    News Weather App
                </h1>
                <p className='text-start mt-5'>
                    Las noticias no solo nos informan, también moldean nuestra óptica.
                    Los sentimientos presentes en ellas influyen en nuestras percepciones y opiniones.<br></br>
                    News Weather App hace un analisis de sentimiento de los titulares principlaes de News API utilizando la librería Sentiment y los
                    presenta en una interfaz similiar a una aplicación del clima.<br></br>
                     La puntuación presentada es una media del Score de sentimiento de las palabras presentes 
                    en los títulares junto con una media de la cantidad de noticias relacionadas al miedo y a la esperanza disponibles en el día.
                </p>
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <div className="card col-6 ms-5">
                            <div>
                                {<Today score={ data.score?.toFixed(2)}></Today>}
                            </div>
                            <div className='card-body text-start'>
                                <h5 className='card-title'>
                                    Títulares relacionados a la palabra 'hope': { data.hope }
                                </h5>
                                <h5 className='card-title'>
                                    Títulares relacionados a la palabra 'fear': { data.fear }
                                </h5>
                                <p className='card-text'>
                                    La puntuación del 1 al 10, siendo 1 total negatividad y 10 total positividad, es de: { data && data.score ? data.score.toFixed(2) : 'N/A'  }
                                </p>
                            </div>
                            
                        </div>
                        <div className='col-6 text-start ms-2'>
                            <h3>
                                palabras positivas:
                            </h3>
                            <p>
                                <div className="words">{data.positive.join(", ")}</div>
                            </p>
                            <h3>
                                palabras negativas:
                            </h3>
                            <p>
                                <div className="words">{data.negative.join(", ")}</div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <h3 className='display-6 mt-5 mb-4'>Análisis de los últimos 6 días</h3>
                    <LastWeek></LastWeek>
                </div>
        </div>
        )
    }

    return (        
        <div className='container'>
            { content }
        </div>
    );
}

export default Weather;
