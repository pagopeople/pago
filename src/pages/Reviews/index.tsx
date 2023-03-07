import React, { useEffect } from 'react';

import ReviewCard from '../../components/ReviewCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import './Reviews.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { getReviewsAsync, startNewReview } from '../../reducers/ReviewsSlice';
import { LoadState } from '../../types';
import { ColorRing } from 'react-loader-spinner';

export default function Reviews() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const reviewsState = useAppSelector(state => state.reviewsState);
    const sessionState = useAppSelector(state => state.sessionState);
    
    useEffect(() => {
        if (sessionState.loadState === LoadState.LOADED && reviewsState.loadState === LoadState.INIT) {
            dispatch(getReviewsAsync())
        }
    }, [sessionState.loadState, dispatch, reviewsState.loadState])

    const onAddReviewClick = () => {
        dispatch(startNewReview('endproj'));
        navigate("/review");
    }

    const onAddMidProjReviewClick = () => {
        dispatch(startNewReview('midproj'));
        navigate("/review");
    }

    return(
        <div className='reviews-container'>
            <div className='reviews-header'>
                <h2>
                    Your reviews
                </h2>
                <div className='reviews-add' onClick={onAddMidProjReviewClick}>
                    <BsFillPlusCircleFill /> Add a Mid-Project review
                </div>
                <div className='reviews-add' onClick={onAddReviewClick}>
                    <BsFillPlusCircleFill /> Add a review
                </div>
            </div>
            <ColorRing
                visible={reviewsState.loadState === LoadState.LOADING }
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            <h3>
                Review Requests
            </h3>
            {
                reviewsState.requestedReviews.map((review) => 
                    <span onClick={() => navigate(`/review/${review.originalReview}/direct_report`)}>
                        <ReviewCard review={review} key={review.id} />
                    </span>
                )
            }

            <h3>
                Completed reviews
            </h3>
            
            
            {
                reviewsState.completedReviews.map((review) => 
                    <span onClick={() => navigate(`/review/${review.id}`)}>
                        <ReviewCard review={review} key={review.id} />
                    </span>
                )
            }
        </div>
    )
}