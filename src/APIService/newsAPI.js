import APIRequest from "./axios.config";
const key = process.env.REACT_APP_API_KEY;
const today = new Date();
const todayISO8601 = today.toISOString();
const day = new Date();
day.setDate(today.getDate() - 1);
const yesterdayISO8601 = day.toISOString();

export function getAngerNews(){
    return APIRequest.get(`/top-headlines?q=anger&from=${todayISO8601}sortBy=popularity&apiKey=${key}`)
}

export function getFearNews(){
    return APIRequest.get(`/top-headlines?q=fear&from=${todayISO8601}sortBy=popularity&apiKey=${key}`)
}

export function getSadnessNews(){
    return APIRequest.get(`/top-headlines?q=sadness&from=${todayISO8601}sortBy=popularity&apiKey=${key}`)
}

export function getLoveNews(){
    return APIRequest.get(`/top-headlines?q=love&from=${todayISO8601}sortBy=popularity&apiKey=${key}`)
}

export function getHopeNews(){
    return APIRequest.get(`/top-headlines?q=hope&from=${todayISO8601}sortBy=popularity&apiKey=${key}`)
}

export function getJoyNews(){
    return APIRequest.get(`/top-headlines?q=joy&from=${todayISO8601}sortBy=popularity&apiKey=${key}`)
}

export function getGeneralTopHeadlines(){
    return APIRequest.get(`/top-headlines?country=us&from=${todayISO8601}&sortBy=popularity&apiKey=${key}`);
}

export function getGeneralTopHeadlinesDaysAgo(day1, day2){
    return APIRequest.get(`/top-headlines?country=us&category=general&from=${day1}to=${day2}sortBy=popularity&apiKey=${key}`)
}

export function getPrueba(){
    return APIRequest.get(`/top-headlines?q=hope&from=${todayISO8601}&sortBy=publishedAt&apiKey=${key}`)
}
