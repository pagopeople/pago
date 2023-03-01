import React, { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCompDataAsync } from '../../reducers/CompensationSlice';
import { LoadState } from '../../types';


export default function Pay() {
    const dispatch = useAppDispatch();
    const compensationState = useAppSelector(state => state.compensationState)

    useEffect(() => {
        if (compensationState.loadState === LoadState.INIT) {
            dispatch(getCompDataAsync());
        }
    }, [])

    return(
        <div>
            Pay
            <ColorRing
                visible={compensationState.loadState === LoadState.LOADING }
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            {compensationState.loadState === LoadState.LOADED &&
                <div>
                    {compensationState.salary ? <p>Salary ${compensationState.salary}</p> : <p>No salary info</p>}
                </div>
            }
        </div>
    )
}