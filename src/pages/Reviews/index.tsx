import React, { useEffect } from 'react';

import ReviewCard from '../../components/ReviewCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import './Reviews.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { startNewReview } from '../../reducers/ReviewsSlice';

export default function Reviews() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const reviewsState = useAppSelector(state => state.reviewsState);
    
    useEffect(() => {
        if (reviewsState.activeReview !== undefined) {
            navigate("/reviews/new")
        }
    }, [reviewsState.activeReview]);

    const onAddReviewClick = () => {
        dispatch(startNewReview());
    }

    return(
        <div className='reviews-container'>
            <div className='reviews-header'>
                <h2>
                    Your completed reviews
                </h2>
                <div className='reviews-add' onClick={onAddReviewClick}>
                    <BsFillPlusCircleFill /> Add a review
                </div>
            </div>
            
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
        </div>
    )
}