import React from 'react';
import "./DataPointDescriptive.css";


interface Props {
    description?: string, 
    helpLink?: string,
    onHelpLinkClick?: () => void,
    children: React.ReactNode,
}

export default function DataPointDescriptive(props: Props ) {
    const {
        description,
        helpLink,
        onHelpLinkClick,
        children
    } = props;
    return (<div className="dpd-container">
        {description && <div className="dpd-text">
            {description}
        </div>}
        <div className="dpd-children">
            {children}
        </div>
        {helpLink && <div className="dpd-help">
            <a onClick={onHelpLinkClick} className="dpd-help-link">{helpLink}</a>
        </div>}
        
    </div>);
}