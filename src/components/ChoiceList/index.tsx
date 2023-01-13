import React, { useEffect } from 'react';

import './ChoiceList.css';

interface Props {
    startHint?: string,
    endHint?: string,
    options: Array<number | string>,
    selectedIdx: number | undefined,
    onSelectedIdxChange: (idx: number) => void,
};

export default function ChoiceList(props: Props) {
    const {
        startHint,
        endHint,
        options,
        onSelectedIdxChange,
        selectedIdx
    } = props;

    useEffect(() => {
        console.log('si', selectedIdx)
    }, [selectedIdx])
    return(
        <div className='choice-list-container'>
            {startHint && <div className='choice-list-hint'>
                {startHint}
            </div>}
            {options.map((option, idx) => {
                return(
                    <div 
                        className={`choice-list-option${selectedIdx === idx ? " choice-list-option-active": ""}`}
                        key={option}
                        onClick={() => onSelectedIdxChange(idx)}
                    >
                        {option}
                    </div>
                )
            })}
            {endHint && <div className='choice-list-hint'>
                {endHint}
            </div>}
        </div>
    );
}