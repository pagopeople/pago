import React from 'react';
import { useState } from 'react';
import { FormLabel } from '@mui/material';

import './NumberRating.css';
interface NumberRatingProps {
  id?: string;
  value: number;
  updateValue: (newValue: number) => void;
  maxVal?: number;
  startHint?: string,
  endHint?: string,
  options: Array<number>,
  title?: string,
}

export const NumberRating: React.FC<NumberRatingProps> = (props) => {
    const {
        startHint,
        endHint,
        options,
        updateValue,
        value,
        title,
    } = props;

    return(
        <>
            {title && <FormLabel>{title}</FormLabel>}
            <div className='choice-list-container'>
                {startHint && <div className='choice-list-hint'>
                    {startHint}
                </div>}
                {options.map((option) => {
                    return(
                        <div 
                            className={`choice-list-option${value === option ? " choice-list-option-active": ""}`}
                            key={option}
                            onClick={() => updateValue(option)}
                        >
                            {option}
                        </div>
                    )
                })}
                {endHint && <div className='choice-list-hint'>
                    {endHint}
                </div>}
            </div>
        </>
        
    );
};