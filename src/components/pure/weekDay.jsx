import React from 'react';
import '../../App.css';
import sun from '../../assets/images/sun.png'
import cloud from '../../assets/images/cloudAndSun.png'
import rain from '../../assets/images/rain.png'
import storm from '../../assets/images/storm.png'


const WeekDay = ({ date, weekday, score }) => {

    let showedScored = (score + 5).toFixed(2)
    let icon;
    if(score > 2.5){
        icon = <img src={sun} className='dailyIcon'  alt='sun'></img>;  
    } else if(score <= 2.5 && score > 0 ){
        icon = <img src={cloud} className='dailyIcon'  alt='sun'></img>;
    } else if(score <= 0 && score > -2.5 ){
        icon = <img src={rain} className='dailyIcon' alt='sun'></img>;
    } else if (score <= -2.5 ){
        icon = <img src={storm} className='dailyIcon' alt='sun'></img>;
    }

    return (
        <div className='dailyItem'>
            <div className='dayDate'>{ weekday }, { date }</div>
            <div className='dayIcon'>{ icon }</div>
            <div className='dayScore'>{ showedScored }</div>
        </div>
    );
}

export default WeekDay;
