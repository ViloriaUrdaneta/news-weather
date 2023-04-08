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

    if (data === []) {
        return <div>Loading...</div>;
    }

    return (
        <div className=''>
            <h3>lastWeek</h3>
            <table className='weekSection'>
                <tbody>
                    {
                        data.map((day, index) => {
                            return (
                                <WeekDay
                                    key={index} date={day.esDate} weekday={day.weekday} score={day.score}>
                                </WeekDay>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );

}
export default LastWeek;



/**
 * 
 * const promises = [];

    for (let i = 0; i < 5; i++) {
        let day1 = lastSevenDays[i].isoDate;
        let day2 = lastSevenDays[i + 1].isoDate;
        const promise = getGeneralTopHeadlinesAllWeek(day1, day2)
            .then((response) => {
                if(response.status === 200){
                    return response.data.articles;
                }
            }).catch((error) => console.log('error en  getGeneralTopHeadlinesAllWeek: ', error));
        promises.push(promise);
    }

    
    Promise.all(promises).then((articlesArrays) => {
        const sentimentScores = [];
        const comparativeMediaArray = [];
        for (let i = 0; i < 7; i++){
            const sentiment = new Sentiment();
            const articlesPerDay = articlesArrays[i];
            const titlesArray = [];
            articlesPerDay.forEach(article => {
                titlesArray.push(article.title);
            });
            titlesArray.forEach((title) => {
            let analisys = sentiment.analyze(title);
            sentimentScores.push(analisys);
        });
        const comparatives = sentimentScores.map((score) => score.comparative);
        const comparativesSuma = comparatives.reduce((a, b) => a + b, 0);
        const comparativeMedia = comparativesSuma / comparatives.length;
        comparativeMediaArray.push(comparativeMedia)
        }
        for (let i = 0; i < lastSevenDays.length; i++) {
            lastSevenDays[i].score = comparativeMediaArray[i];
        }
    });

    console.log('lastSevenDays: ', lastSevenDays)
 * 
 * 
 */



    /***
     * 
     * const getArticles = async () => {
        const sentimentScores = [];
        const comparativeMediaArray = [];
        const promises = [];

        for (let i = 0; i < 6; i++) {
            let day1 = lastSevenDays[i].isoDate;
            let day2 = lastSevenDays[i + 1].isoDate;
            const promise = getGeneralTopHeadlinesAllWeek(day1, day2)
                .then((response) => {
                    if (response.status === 200) {
                        return response.data.articles;
                    }
                })
                .catch((error) => console.log("error en  getGeneralTopHeadlinesAllWeek: ", error));
            promises.push(promise);
        }

        try {
            const articlesPerDayArray = await Promise.all(promises);
            console.log('articlesPerDayArray', articlesPerDayArray )
            articlesPerDayArray.forEach((articlesPerDay) => {
                const sentiment = new Sentiment();
                const titlesArray = [];
                articlesPerDay.forEach((article) => {
                    titlesArray.push(article.title);
                });

                titlesArray.forEach((title) => {
                    let analysis = sentiment.analyze(title);
                    sentimentScores.push(analysis);
                });
                console.log('sentimentScores: ', sentimentScores)
                const comparatives = sentimentScores.map((score) => score.comparative);
                const comparativesSuma = comparatives.reduce((a, b) => a + b, 0);
                const comparativeMedia = comparativesSuma / comparatives.length;
                comparativeMediaArray.push(comparativeMedia);
            });

            for (let i = 0; i < lastSevenDays.length; i++) {
                lastSevenDays[i].score = comparativeMediaArray[i];
            }
            
            lastSevenDays.pop();
            console.log("lastSevenDays: ", lastSevenDays);
            setData(lastSevenDays);
            
        } catch (error) {
            console.log("error en getGeneralTopHeadlinesAllWeek: ", error);
        }
    };

    useEffect(() => {
        const fetchArticles = async () => {
            await getArticles();
        };
        fetchArticles();
    }, []);
     * 
     */