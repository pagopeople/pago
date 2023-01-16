import React from 'react';
import { Review } from '../../types';

import './ReviewCard.css';

interface Props {
    review: Review,
}

export default function ReviewCard(props: Props) {
    const {
        review,
    } = props;
    return(
        <div className='review-card-container'>
            <div className='review-card-title'>
                {review.projectName}
            </div>
            <div className='review-card-description'>
                {review.projectDescription}
            </div>
        </div>
    )
}