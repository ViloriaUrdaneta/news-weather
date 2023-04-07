import React, { useState, useEffect } from 'react';
import { todayScore } from '../APIService/todayScore'
import LastWeek from '../components/lastWeek';
import Today from '../components/pure/today';



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


    if (data.score === 0) {
        return <div>Loading...</div>;
    }

    return (        
        <div>
            <h1>
                Clima informativo:
            </h1>
            <div>
                {<Today score={ data.score?.toFixed(2)}></Today>}
            </div>
            <h3>
                Buenas noticias: { data.hope }
            </h3>
            <h3>
                Malas noticias: { data.fear }
            </h3>
            <p>
                La puntuación de sentimiento del 1 al 10 es de: { data && data.score ? data.score.toFixed(2) : 'N/A'  }
            </p>
            {/*
            <p>noticias con love: { goods.loveCount }, noticias con hope: { goods.hopeCount }, noticias con joy: { goods.joyCount } </p>
            <p>noticias con anger: { bads.angerCount }, noticias con fear: { bads.fearCount }, noticias con sadness: { bads.sadnessCount } </p>*/}
            <div>
                <LastWeek></LastWeek>
            </div>
        </div>
    );
}

export default Weather;



/**
 *     /*
    const [ news, setNews ] = useState([]);
    const [ bads, setBads] = useState(0)
    const [ goods, setGoods] = useState(0)

    useEffect(() => {  
        
        badNewsCount()
            .then((response) => {
                setBads(response)
                })
            .catch((error) => {alert('error en badnews count: ', error)});
        goodNewsCount()
            .then((response) => {
                setGoods(response)
                })
            .catch((error) => {alert('error en goodNewsCount count: ', error)});
        getGeneralTopHeadlines()
            .then((response) => {
                if(response.status === 200){
                    setNews(response.data.articles)
                }
                console.log('response: ',response)
                console.log('articles: ',response.data.articles)
                })
            .catch((error) => {console.log(error)});
                
    },[]);

    const sentiment = new Sentiment();
    const titles = news.map((article) => article.title);
    let sentimentScores = [];
    titles.forEach((title) => {
        let analisys = sentiment.analyze(title);
        sentimentScores.push(analisys);
    });
    const comparatives = sentimentScores.map((score) => score.comparative);
    const comparativesSuma = comparatives.reduce((a, b) => a + b, 0);
    const comparativeMedia = comparativesSuma / comparatives.length;
    console.log( 'sentimentScores: ', sentimentScores);
    console.log( 'sentimentScore: ', comparativeMedia);
    const goodsProportion = (goods.totalCount / ( goods.totalCount + bads.totalCount )) * 10;
    console.log( 'goodsProportion: ', goodsProportion);
    const totalMedia = (goodsProportion - 5) + comparativeMedia;
    console.log( 'totalMedia: ', totalMedia);

    let icon;
    if(totalMedia > 2.5){
        icon = <img src={sun} alt='sun'></img>;  
    } else if(totalMedia <= 2.5 && totalMedia >= 0 ){
        icon = <img src={cloud} alt='sun'></img>;
    } else if(totalMedia <= 0 && totalMedia >= -2.5 ){
        icon = <img src={rain} alt='sun'></img>;
    } else if (totalMedia < -2.5 ){
        icon = <img src={storm} alt='sun'></img>;
    }
*/
