import React, { useState, useEffect } from 'react';
import { getGeneralTopHeadlinesAllWeek } from '../APIService/newsAPI';
import WeekDay from './pure/weekDay';
const Sentiment = require('sentiment');

const LastWeek = () => {
    
    const [data, setData] = useState([]);

    const lastSevenDays = [];
    const weekdays = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

    for (let i = 1; i < 8; i++) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const isoDate = day.toISOString().slice(0, 10);
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const esDate = day.toLocaleDateString('es-ES', opciones).slice(0, 5);;
        const weekdayIndex = day.getDay();
        const weekdayName = weekdays[weekdayIndex];
        lastSevenDays.push({ day: day, isoDate: isoDate, weekday: weekdayName, esDate: esDate});
    }

    const getArticles = async () => {
        
        const comparativeMediaArray = [];

        for (let i = 0; i < 6; i++) {
            //ayer y anteayer
            let day1 = lastSevenDays[i].isoDate;
            let day2 = lastSevenDays[i + 1].isoDate;
            //llamar a la API
            const GeneralTopHeadlinesAllWeek=  await getGeneralTopHeadlinesAllWeek(day1, day2);
            console.log('GeneralTopHeadlinesAllWeek', GeneralTopHeadlinesAllWeek, i, day1, day2)
            //Separar articulos de la API
            const articlesPerDayArray = GeneralTopHeadlinesAllWeek.data.articles;
            //Por cada articulo tomar su título
            const titlesPerDay = articlesPerDayArray.map((article) => 
                article.title
            )  
            const sentimentScores = [];  
            titlesPerDay.forEach((title) => {
                const sentiment = new Sentiment();
                let analysis = sentiment.analyze(title);
                sentimentScores.push(analysis);
            });
            const comparatives = sentimentScores.map((score) => score.comparative);
            const comparativesSuma = comparatives.reduce((a, b) => a + b, 0);
            const comparativeMedia = comparativesSuma / comparatives.length;
            comparativeMediaArray.push(comparativeMedia);
        };

        for (let i = 0; i < lastSevenDays.length; i++) {
            lastSevenDays[i].score = comparativeMediaArray[i];
        }
                
        lastSevenDays.pop();
        setData(lastSevenDays);       
    }
    
    useEffect(() => {
        const fetchArticles = async () => {
            await getArticles();
        };
        fetchArticles();
    }, []);

    let week;
    if (data === []) {
        week = (
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        )
    } else {
        week = (
            <div>
                {
                    data.map((day, index) => {
                        return (
                            <WeekDay
                                key={index} date={day.esDate} weekday={day.weekday} score={day.score}>
                            </WeekDay>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div>
            { week }
        </div>
    );

}
export default LastWeek;
