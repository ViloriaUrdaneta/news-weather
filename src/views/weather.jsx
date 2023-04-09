import React, { useState, useEffect } from 'react';
import { todayScore } from '../APIService/todayScore'
import LastWeek from '../components/lastWeek';
import Today from '../components/pure/today';
import '../App.css';

const Weather = () => {

    const [ data, setData] = useState({ score: 0, hope: '', fear: '' });

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
                <p className='text-start mt-3'>
                    Las noticias no solo nos informan, también moldean nuestra óptica.<br></br>
                    Los sentimientos presentes en ellas influyen en nuestras percepciones y opiniones.<br></br>
                    News Weather App hace un analisis de sentimiento de los titulares principlaes de News API utilizando la librería Sentiment y los
                    presenta en una interfaz similiar a una aplicación del clima.
                </p>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="card col-6">
                            <div>
                                {<Today score={ data.score?.toFixed(2)}></Today>}
                            </div>
                            <p>
                                La puntuación del 1 al 10, siendo 1 total negatividad y 10 total positividad, es de: { data && data.score ? data.score.toFixed(2) : 'N/A'  }
                            </p>
                        </div>
                        <div className='col-6'>
                            <h3>
                                Noticias relacionadas a la palabra 'hope': { data.hope }
                            </h3>
                            <h3>
                                Noticias relacionadas a la palabra 'fear': { data.fear }
                            </h3>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className='display-6 mt-5 mb-3'>Análisis de los últimos 6 días</h3>
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
