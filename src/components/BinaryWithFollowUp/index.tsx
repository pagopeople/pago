import React, {ChangeEvent} from 'react';

import './BinaryWithFollowUp.css';

interface Props {
    trueText: string,
    falseText: string,
    inputPlaceholder: string,
    onSelectedUpdate: (val: boolean) => void,
    onInputUpdate: (s: string) => void,
    selected: boolean | undefined,
    followUpValue?: string,
}

export default function BinaryWithFollowUp(props: Props) {
    const {
        trueText,
        falseText,
        inputPlaceholder,
        onInputUpdate,
        onSelectedUpdate,
        selected,
        followUpValue,
    } = props;

    const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        onInputUpdate(evt.currentTarget.value);
    }
    return(
        <div className='binary-with-follow-up-container'>
            <div 
                className={`bwfu-option${selected ? " bwfu-option-active" : ""}`}
                onClick={() => {onSelectedUpdate(true)}}
            >
                {trueText}
            </div>
            <div 
                className={`bwfu-option${selected === false ? " bwfu-option-active" : ""}`}
                onClick={() => {onSelectedUpdate(false)}}
            >
                {falseText}
            </div>
            <div>
                <input onChange={onInputChange} value={followUpValue} type='text' placeholder={inputPlaceholder} />
            </div>

        </div>
    )
}