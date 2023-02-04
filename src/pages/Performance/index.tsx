import React, { useEffect } from 'react';
import ProgressBar from '../../components/ProgressBar';
import ProgressCircle from '../../components/ProgressCircle';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { reviewsSlice } from '../../reducers/ReviewsSlice';
import { getEmployeeScoreAsync, getSummaryAsync } from '../../reducers/ScoresSlice';
import { LoadState } from '../../types';


export default function Performance() {
    const dispatch = useAppDispatch();
    const scoresState = useAppSelector((state) => state.scoresState);
    const sessionState = useAppSelector((state) => state.sessionState);

    useEffect(() => {
        if (sessionState.loadState === LoadState.LOADED && scoresState.loadState === LoadState.INIT) {
            dispatch(getEmployeeScoreAsync(sessionState.user.accessToken || ''));
            dispatch(getSummaryAsync(sessionState.user.accessToken || ''));
        }
    }, [sessionState.loadState]);

    const groupReviewsByProjectSize = () => {

        return scoresState.reviewScores.reduce((mp: {[key: string]: any}, score: any, ) => {
            const projects = mp[score.projectSize] ? mp[score.projectSize] : []
            return {
                ...mp,
                [score.projectSize]: [projects, score]
            }
        }, {})
    }

    const renderProjectSummary = (
        size: string, 
        averageScore: number,
        topSubText: string,
        bottomSubText: string,
    ) => 
        <div className={'performance-project-size-summary-container'}>
            <h3>{size} projects</h3>
            <div>{topSubText}</div>
            <ProgressCircle progress={averageScore} />
            <div>{bottomSubText}</div>
        </div>

    

    const getProjectSummary = () => {
        const bySize = groupReviewsByProjectSize();

        console.log(bySize);

        return(
            <div>
                {renderProjectSummary(
                    'Existential',
                    34,
                    'The company will fail if I do a bad job',
                    '2% of your scores came from these projects',
                )}

                {renderProjectSummary(
                    'Large',
                    27,
                    'The company will fail if I do a bad job',
                    '34% of your scores came from these projects',
                )}

                {renderProjectSummary(
                    'Medium',
                    85,
                    'The company will fail if I do a bad job',
                    '42% of your scores came from these projects',
                )}

                {renderProjectSummary(
                    'Small',
                    92,
                    'The company will fail if I do a bad job',
                    '5 of your scores came from these projects',
                )}
            </div>
        )
    }


    return(
        <div>
            Performance
            {scoresState.loadState === LoadState.LOADED && 
                <div>
                    <ProgressBar progress={scoresState.employeeScore.score / .10} description={`Average ${scoresState.employeeScore.score}`}/>
                    {getProjectSummary()}
                </div>
            }
        </div>
    )
}