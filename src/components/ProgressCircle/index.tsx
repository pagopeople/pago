import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

// import 'react-circular-progressbar/dist/styles.css';

import './ProgressCircle.css';


interface Props {
    progress: number;
    description?: string;
}
export default function ProgressCircle(props: Props) {
    const {
        progress,
        description,
    } = props;
    return(
        <div className='progress-circle-container'>
            {/* <div className='progress-circle-circle'>
                <div className='progress-circle-percentage'>
                </div>
            </div> */}
            <CircularProgressbar value={progress}/>
        </div>
    )
}