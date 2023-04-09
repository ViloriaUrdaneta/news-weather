import { getHopeNews, getFearNews, getGeneralTopHeadlines} from './newsAPI'
const Sentiment = require('sentiment');

export async function todayScore() {

    let hope;
    let fear;
    let articles = [];
    let positiveWords = [];
    let negativeWords = [];

    const hopeNews = await getHopeNews();
    if(hopeNews.status === 200){
        hope = hopeNews.data.totalResults
    }

    const fearNews = await getFearNews();
    if(fearNews.status === 200){
        fear = fearNews.data.totalResults;
    }

    const generalHeadlines = await getGeneralTopHeadlines();
    if(generalHeadlines.status === 200){
        articles = generalHeadlines.data.articles;
    }

    const sentiment = new Sentiment();
    const titles = articles.map((article) => article.title);
    let sentimentScores = [];
    titles.forEach((title) => {
        let analisys = sentiment.analyze(title);
        sentimentScores.push(analisys);
    });
    console.log('sentimentScores: ', sentimentScores)
    const comparatives = sentimentScores.map((score) => score.comparative);
    const comparativesSuma = comparatives.reduce((a, b) => a + b, 0);
    const comparativeMedia = comparativesSuma / comparatives.length;
    const goodsProportion = (hope / ( hope + fear )) * 10;
    const totalMedia = (goodsProportion + (comparativeMedia + 5)) / 2;
    sentimentScores.forEach((analisys) => {
        if(analisys.negative.length !== 0){
            for(let i = 0; i < analisys.negative.length; i++){
                negativeWords.push(analisys.negative[i])
            };
        };
        if(analisys.positive.length !== 0){
            for(let i = 0; i < analisys.positive.length; i++){
                positiveWords.push(analisys.positive[i])
            };
        };
    });

    return {
        hope: hope,
        fear: fear, 
        score: totalMedia,
        negative: negativeWords,
        positive: positiveWords
    }  
}