import React from 'react';
import { MeritIncreaseSetting } from '../../types';

import './MeritIncreaseEditor.css';

interface MeritIncreaseEditorProps {
    meritIncreaseSettings: MeritIncreaseSetting[];
}

export default function MeritIncreaseEditor(props: MeritIncreaseEditorProps) {
    const { meritIncreaseSettings } = props;
    return(
        <div>
            {meritIncreaseSettings.map(mis => {
                return(
                    <div className='merit-increase-editor-row'>
                        <div className='merit-increase-editor-cell'>
                            {mis.scoreStart} - {mis.scoreEnd}
                        </div>
                        <div className='merit-increase-editor-cell'>
                            {mis.percentageIncrease}
                        </div>
                    </div>
                );
            })}

        </div>
    );
}