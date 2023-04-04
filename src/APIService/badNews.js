import { getAngerNews, getFearNews, getSadnessNews } from './newsAPI'

export async function badNewsCount() {

    let anger;
    let fear;
    let sadness;

    const angerNews = await getAngerNews();
    if(angerNews.status === 200){
        anger = angerNews.data.totalResults
    }

    const fearNews = await getFearNews();
    if(fearNews.status === 200){
        fear = fearNews.data.totalResults
    }

    const sadnessNews = await getSadnessNews();
    if(sadnessNews.status === 200){
        sadness = sadnessNews.data.totalResults
    }

    const totalBadNews = anger + fear + sadness;

    return { 
        angerCount: anger,
        fearCount: fear,
        sadnessCount: sadness, 
        totalCount: totalBadNews }

    }