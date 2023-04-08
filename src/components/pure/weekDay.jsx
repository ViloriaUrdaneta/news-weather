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
        icon = <img src={sun} alt='sun'></img>;  
    } else if(score <= 2.5 && score >= 0 ){
        icon = <img src={cloud} alt='sun'></img>;
    } else if(score <= 0 && score >= -2.5 ){
        icon = <img src={rain} className='dailyIcon' alt='sun'></img>;
    } else if (score < -2.5 ){
        icon = <img src={storm} className='dailyIcon' alt='sun'></img>;
    }

    return (
        <div className='dailyItem'>
                <tr>
                    <td>{ weekday },</td>
                    <td>{ date }</td>
                    <td>{ icon }</td>
                    <td>{ showedScored }</td>
                </tr>
        </div>
    );
}

export default WeekDay;
