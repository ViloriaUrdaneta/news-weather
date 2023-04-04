import { getLoveNews, getHopeNews, getJoyNews } from './newsAPI'

export async function goodNewsCount() {

    let love;
    let hope;
    let joy;

    const loveNews = await getLoveNews();
    if(loveNews.status === 200){
        love = loveNews.data.totalResults
    }

    const hopeNews = await getHopeNews();
    if(hopeNews.status === 200){
        hope = hopeNews.data.totalResults
    }

    const joyNews = await getJoyNews();
    if(joyNews.status === 200){
        joy = joyNews.data.totalResults
    }

    const totalGoodNews = love + hope + joy;

    return {
        loveCount: love,
        hopeCount: hope,
        joyCount: joy, 
        totalCount: totalGoodNews
    }  
    
}