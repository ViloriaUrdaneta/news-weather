import React from 'react';

const WeekDay = ({ date, weekday }) => {
    return (
        <div>
            <tr>
                <td>{ weekday }</td>
                <td>{ date }</td>
                
            </tr>
        </div>
    );
}

export default WeekDay;
