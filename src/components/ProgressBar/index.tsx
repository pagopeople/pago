import React from 'react';
import "./ProgressBar.css";



export default function ProgressBar( props: {progress:number, description?:string}) {
    return (
        <div className='progress-bars'>
            <div className="progress-bar-container">
                <div className='progress-bar-progress' style={{width: "" + props.progress + "%"}}></div>
            </div>
            {props.description && <div className="progress-bar-description">{props.description}</div>}
        </div>
    );
}