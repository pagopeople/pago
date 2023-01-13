import React from 'react';

import './ReviewCard.css';

export default function ReviewCard() {
    return(
        <div className='review-card-container'>
            <div className='review-card-title'>
                The project name.
            </div>
            <div className='review-card-description'>
                A short description about what the project was.
            </div>
        </div>
    )
}