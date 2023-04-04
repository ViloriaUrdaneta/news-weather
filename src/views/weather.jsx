import React, { useState, useEffect } from 'react';
import { getGeneralTopHeadlines } from '../APIService/newsAPI';
import { badNewsCount } from '../APIService/badNews'
import { goodNewsCount } from '../APIService/goodNews'
import sun from '../assets/images/sun.png'
import cloud from '../assets/images/cloudAndSun.png'
import rain from '../assets/images/rain.png'
import storm from '../assets/images/storm.png'

const Sentiment = require('sentiment');



const Weather = () => {

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




    return (        
        <div>
            <div>
                { icon }
            </div>
            <h1>
                Clima informativo:
            </h1>
            <h3>
                Buenas noticias: { goods.totalCount }
            </h3>
            <h3>
                Malas noticias: { bads.totalCount }
            </h3>
            <p>noticias con love: { goods.loveCount }, noticias con hope: { goods.hopeCount }, noticias con joy: { goods.joyCount } </p>
            <p>noticias con anger: { bads.angerCount }, noticias con fear: { bads.fearCount }, noticias con sadness: { bads.sadnessCount } </p>
        </div>
    );
}

export default Weather;
