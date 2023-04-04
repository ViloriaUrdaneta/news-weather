import React from 'react';

const WeekDay = ({ props }) => {
    return (
        <div>
            <tr>
                <td>{ props.weekday }</td>
                <td>{ props.date }</td>
                <td>{ props.icon }</td>
            </tr>
        </div>
    );
}

export default WeekDay;
