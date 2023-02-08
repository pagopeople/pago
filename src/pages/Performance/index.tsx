import React, { useEffect, useMemo } from 'react';
import ProgressBar from '../../components/ProgressBar';
import ProgressCircle from '../../components/ProgressCircle';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviewsAsync, reviewsSlice } from '../../reducers/ReviewsSlice';
import { getEmployeeScoreAsync, getSummaryAsync } from '../../reducers/ScoresSlice';
import { LoadState, ProjectSizeSummary } from '../../types';
import { Review } from '../../types';
import './Performance.css';

const projectSizeToDescription = {
    'Existential': 'The company will fail if I do a bad job',
    'Large': 'The company will fail if I do a bad job',
    'Medium': 'The company will fail if I do a bad job',
    'Small': 'The company will fail if I do a bad job',
};

export default function Performance() {
    const dispatch = useAppDispatch();
    const scoresState = useAppSelector((state) => state.scoresState);
    const sessionState = useAppSelector((state) => state.sessionState);
    const reviewsState = useAppSelector((state) => state.reviewsState);

    useEffect(() => {
        if (sessionState.loadState === LoadState.LOADED && scoresState.loadState === LoadState.INIT) {
            dispatch(getSummaryAsync(sessionState.user.accessToken || ''));
        }

        if (sessionState.loadState === LoadState.LOADED && reviewsState.loadState === LoadState.INIT) {
            dispatch(getReviewsAsync(sessionState.user.accessToken || ''));
        }
    }, [sessionState.loadState]);

    const reviewsById = useMemo(() => {
        return reviewsState.completedReviews.reduce((reviews: any, review) => {
            reviews[review.id!] = review;
            return reviews;
        }, {});
    }, [reviewsState.completedReviews]);


    const renderProjectSummary = (
        size: string, 
        employeeScoreImpact: number | undefined,
        topSubText: string,
        bottomSubText: string,
    ) => 
        <div className={'performance-project-size-summary-container'}>
            <div className='performance-project-size-summary-header'>
                {size}<br/> projects
            </div>
            <div className='performance-project-size-summary-subText'>
                {topSubText}
            </div>
            <div className='performance-project-size-summary-progress-circle'>
                <ProgressCircle progress={(employeeScoreImpact || 0) * 100} />
            </div>
            <div className='performance-project-size-summary-subText'>
                {(employeeScoreImpact || 0) * 100}% of your scores came from these projects
            </div>
        </div>

    

    const getProjectSummary = () => {
        return(
            <div className='performance-project-size-summaries-container'>
                {renderProjectSummary(
                    'Existential',
                    scoresState.summary?.Existential.employeeScoreImpact,
                    'The company will fail if I do a bad job',
                    '2% of your scores came from these projects',
                )}

                {renderProjectSummary(
                    'Large',
                    scoresState.summary?.Large.employeeScoreImpact,
                    'The company will fail if I do a bad job',
                    '34% of your scores came from these projects',
                )}

                {renderProjectSummary(
                    'Medium',
                    scoresState.summary?.Medium.employeeScoreImpact,
                    'The company will fail if I do a bad job',
                    '42% of your scores came from these projects',
                )}

                {renderProjectSummary(
                    'Small',
                    scoresState.summary?.Small.employeeScoreImpact,
                    'The company will fail if I do a bad job',
                    '5 of your scores came from these projects',
                )}
            </div>
        )
    }

    const renderRecentReviews = (
        projectSize: keyof typeof projectSizeToDescription,
        projectSizeSummary: ProjectSizeSummary,
    ) => {
        return(
            <div className='performance-project-recent-reviews'>
                <div className='performance-project-recent-review-score'>
                    <div className='performance-employee-score-header-container'>
                        <div className='performance-employee-score-header'>
                            {projectSize}
                        </div>
                        <div className='performance-employee-score-subtext'>
                            {projectSizeToDescription[projectSize]}
                        </div>
                    </div> 
                    {projectSizeSummary.recentReviews?.length > 0 ?
                     <ProgressBar progress={(projectSizeSummary.averageScore )/ .10} description={`Your Average ${projectSizeSummary.averageScore}`}/> :
                     <h2>No reviews of this size yet</h2>}
                </div>
                {projectSizeSummary.recentReviews?.map(rr => <div className='performance-recent-review-summary'>
                        <div className='performance-project-recent-review-project-name'>
                            {reviewsById[rr.reviewId] ? reviewsById[rr.reviewId].projectName : 'Error loading review details'} 
                        </div>
                        <div className='performance-project-recent-review-details'>
                            <div className='performance-project-recent-review-impact'>
                                <div className='performance-project-recent-review-circle'>
                                    <ProgressCircle progress={rr.employeeScoreImpact * 100} />
                                    
                                </div>
                                <span className='performance-recent-review-impact-subText'>
                                        {(projectSizeSummary.employeeScoreImpact) * 100}% of your scores came from these projects
                                </span>
                            </div>
                            <div>
                                Overall project performance <ProgressBar progress={(rr.score) / .10} description={`${projectSizeSummary.averageScore}`}/>
                            </div>
                        </div>
                    </div>)}
            </div>
        )
    }


    return(
        <div className='performance-container'>
            {scoresState.loadState === LoadState.LOADED && 
                <>
                    <h1>Performance Dashboard</h1>
                    <div className='performance-employee-score-container'>
                        <div className='performance-employee-score-header-container'>
                            <div className='performance-employee-score-header'>
                                Perfomance
                            </div>
                            <div className='performance-employee-score-subtext'>
                                Your weighted reviews over time
                            </div>
                        </div>
                        <ProgressBar progress={(scoresState.summary?.employeeScore || 0 )/ .10} description={`Average ${scoresState.summary?.employeeScore || 0}`}/>
                    </div>
                    {getProjectSummary()}
                    {renderRecentReviews('Existential', scoresState.summary!.Existential)}
                    {renderRecentReviews('Large', scoresState.summary!.Large)}
                    {renderRecentReviews('Medium', scoresState.summary!.Medium)}
                    {renderRecentReviews('Small', scoresState.summary!.Small)}
                </>
            }
        </div>
    )
}