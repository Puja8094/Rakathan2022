import React from 'react'

import './loading.css';

export const Loading = () => {
    return (
        <div className="container">
            <div className="loader-holder">
                <div className="holder"><div className="box"></div></div>
                <div className="holder"><div className="box"></div></div>
                <div className="holder"><div className="box"></div></div>
            </div>
        </div>
    )
}


