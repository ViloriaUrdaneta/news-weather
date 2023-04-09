import React from 'react';
import sun from '../../assets/images/sun.png'
import cloud from '../../assets/images/cloudAndSun.png'
import rain from '../../assets/images/rain.png'
import storm from '../../assets/images/storm.png'


const Today = ({ score }) => {

    const day = new Date();
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const esDate = day.toLocaleDateString('es-ES', opciones).slice(0, 10);;

    let icon;
    if(score > 7.5){
        icon = <img src={sun} className='todayIcon' alt='sun'></img>;  
    } else if(score <= 7.5 && score > 5 ){
        icon = <img src={cloud} className='todayIcon' alt='sun'></img>;
    } else if(score <= 5 && score > 2.5 ){
        icon = <img src={rain} className='todayIcon' alt='sun'></img>;
    } else if (score <= 2.5 ){
        icon = <img src={storm} className='todayIcon' alt='sun'></img>;
    }

    return (
        <div>
            <div>
                { icon }
            </div>
            <h6>
                { esDate }
            </h6>
        </div>
    );
}

export default Today;
