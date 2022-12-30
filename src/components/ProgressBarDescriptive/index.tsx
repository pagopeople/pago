import React from 'react';
import "./ProgressBarDescriptive.css";
import ProgressBar from '../../components/ProgressBar';


interface Props {
    description?: string, 
    progress: number, 
    helpLink?: string,
    onHelpLinkClick?: () => void,
    progressDescription?: string,
}

export default function ProgressBarDescriptive(props: Props ) {
    const {
        description,
        progress,
        helpLink,
        onHelpLinkClick,
        progressDescription,
    } = props;
    return (<div className="pbd-container">
        {description && <div className="pbd-text">
            {description}
        </div>}
        <ProgressBar progress={progress} description={progressDescription} />
        {helpLink && <div className="pbd-help">
            <a onClick={onHelpLinkClick} className="pbd-help-link">{helpLink}</a>
        </div>}
        
    </div>);
}