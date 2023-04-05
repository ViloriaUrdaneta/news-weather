import React from 'react';
import { getGeneralTopHeadlinesAllWeek } from '../APIService/newsAPI';
import WeekDay from './pure/weekDay';
const Sentiment = require('sentiment');

const LastWeek = () => {
    

    const lastSevenDays = [];
    const weekdays = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    

    for (let i = 1; i < 7; i++) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const isoDate = day.toISOString().slice(0, 10);
        const weekdayIndex =day.getDay();
        const weekdayName = weekdays[weekdayIndex];
        lastSevenDays.push({ day: day, isoDate: isoDate, weekday: weekdayName});
    }

    const promises = [];

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
        for (let i = 0; i < 5; i++){
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


    return (
        <div>
            <h3>lastWeek</h3>
            {
                lastSevenDays.map((day, index) => {
                    return (
                        <WeekDay
                            key={index} date={day.isoDate} weekday={day.weekday}>
                        </WeekDay>
                    )
                })
            }
        </div>
    );
}

export default LastWeek;
