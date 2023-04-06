import React from 'react';
import sun from '../../assets/images/sun.png'
import cloud from '../../assets/images/cloudAndSun.png'
import rain from '../../assets/images/rain.png'
import storm from '../../assets/images/storm.png'


const WeekDay = ({ date, weekday, score }) => {

    let icon;
    if(score > 2.5){
        icon = <img src={sun} alt='sun'></img>;  
    } else if(score <= 2.5 && score >= 0 ){
        icon = <img src={cloud} alt='sun'></img>;
    } else if(score <= 0 && score >= -2.5 ){
        icon = <img src={rain} alt='sun'></img>;
    } else if (score < -2.5 ){
        icon = <img src={storm} alt='sun'></img>;
    }

    console.log(score)

    return (
        <div>
            <tr>
                <td>{ weekday },  </td>
                <td>{ date }</td>
                <td>{ icon }</td>
            </tr>
        </div>
    );
}

export default WeekDay;
