import React, {useState} from 'react';
import BinaryWithFollowUp from '../../components/BinaryWithFollowUp';
import ChoiceList from '../../components/ChoiceList';
import { ProjectSize } from '../../types';

import './ReviewEdit.css';

export default function ReviewEdit() {

    const [hasDeadline, setHadDeadline] = useState<boolean | undefined>(undefined)
    const [deadlineVal, setDeadlineVal] = useState('');
    const optionsOneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [selectedMatchIdx, setSelectedMatchIdx] = useState<number | undefined>();

    const getProjectSizeOptions = () => {
        const options:React.ReactNode[] = [];
        for (const ps in ProjectSize) {
            if (isNaN(Number(ps))) {
                continue;
            }
            options.push(<option value={ps}>{ProjectSize[ps]}</option>)
        }
        return options;
    };

    return(
        <div className='review-edit-container'>
            <div>
                <div>
                    What is the project called?
                </div>
                <input type='text'/>
            </div>
            <div>
                <div>
                    Brief description of the project
                </div>
                <textarea cols={50}/>
            </div>
            <div>
                <div>
                    What company goal does this project work towards?
                </div>
                <select>
                    <option value='Goal1'>The promotion goal</option>
                    <option value='Goal1'>The demotion goal</option>
                    <option value='Goal1'>The ipo goal</option>
                    <option value='Goal1'>The bankrupt goal</option>
                </select>
            </div>
            <div>
                <div>
                    How big of a project is this?
                </div>
                <select>
                    {getProjectSizeOptions()}
                </select>
            </div>
            <div>
                <div>
                    How many hours did this project take?
                </div>
                <input type='number' />
            </div>
            <div>
                <div>
                    Did the project have a deadline?
                </div>
                <BinaryWithFollowUp 
                    trueText='Yes'
                    falseText='No'
                    inputPlaceholder='If Yes, enter deadline'
                    selected={hasDeadline}
                    onSelectedUpdate={setHadDeadline}
                    onInputUpdate={setDeadlineVal}
                    followUpValue={deadlineVal}
                />
            </div>
            <div>
                <div>
                    Was the project completed on or ahead of schedule? If not, what happened?
                </div>
                <BinaryWithFollowUp 
                    trueText='Yes'
                    falseText='No'
                    inputPlaceholder='If No, what happened?'
                    selected={hasDeadline}
                    onSelectedUpdate={setHadDeadline}
                    onInputUpdate={setDeadlineVal}
                    followUpValue={deadlineVal}
                />
            </div>
            <div>
                <div>
                    How closely did the project you completed match what was needed?
                </div>
                <ChoiceList 
                    startHint={'Not close'}
                    endHint={'Exactly what was needed'}
                    options={optionsOneToTen}
                    selectedIdx={selectedMatchIdx}
                    onSelectedIdxChange={setSelectedMatchIdx} 
                />
            </div>
            <div>
                <div>
                    Were expectations for the project clear?
                </div>
                <ChoiceList 
                    startHint={'Mud'}
                    endHint={'Crystal'}
                    options={optionsOneToTen}
                    selectedIdx={selectedMatchIdx}
                    onSelectedIdxChange={setSelectedMatchIdx} 
                />
            </div>
            <div>
                <div>
                    Were there errors found after the project was completed?
                </div>
                <ChoiceList 
                    startHint={'A lot'}
                    endHint={'None'}
                    options={optionsOneToTen}
                    selectedIdx={selectedMatchIdx}
                    onSelectedIdxChange={setSelectedMatchIdx} 
                />
            </div>
            <div>
                <div>
                    How involved was your manager in the project?
                </div>
                <ChoiceList 
                    startHint={'Not involved'}
                    endHint={'Constantly involved'}
                    options={optionsOneToTen}
                    selectedIdx={selectedMatchIdx}
                    onSelectedIdxChange={setSelectedMatchIdx} 
                />
            </div>
            <div>
                <div>
                    If you completed the project again how involved would your manager need to be?
                </div>
                <ChoiceList 
                    startHint={'Not involved'}
                    endHint={'Constantly involved'}
                    options={optionsOneToTen}
                    selectedIdx={selectedMatchIdx}
                    onSelectedIdxChange={setSelectedMatchIdx} 
                />
            </div>
            <div>
                <div>
                    Did your manager involve themselves too much?
                </div>
                <ChoiceList 
                    startHint={'Not Enough'}
                    endHint={'Way too much'}
                    options={optionsOneToTen}
                    selectedIdx={selectedMatchIdx}
                    onSelectedIdxChange={setSelectedMatchIdx} 
                />
            </div>
            <div>
                <div>
                    Did you work with any coworkers?
                </div>
                <select>
                    <option value='Goal1'>John</option>
                    <option value='Goal1'>Monte</option>
                    <option value='Goal1'>Spencer</option>
                    <option value='Goal1'>Stephen</option>
                </select>
            </div>
            <div>
                <div>
                    How did your coworkers perform?
                </div>
                <ChoiceList 
                    startHint={'Poorly'}
                    endHint={'Exceptional'}
                    options={optionsOneToTen}
                    selectedIdx={selectedMatchIdx}
                    onSelectedIdxChange={setSelectedMatchIdx} 
                />
            </div>
            <div>
                <div>
                    What skills did you use to finish the project?
                </div>
                <select>
                    <option value='Goal1'>Ninja</option>
                    <option value='Goal1'>Knife</option>
                    <option value='Goal1'>People</option>
                    <option value='Goal1'>Cooking</option>
                </select>
            </div>
            <div>
                <div>
                    What level of proficiency did you need for each of the skills you selected?
                </div>
                <ChoiceList 
                    startHint={'Not involved'}
                    endHint={'Constantly involved'}
                    options={optionsOneToTen}
                    selectedIdx={selectedMatchIdx}
                    onSelectedIdxChange={setSelectedMatchIdx} 
                />
            </div>
            <div>
                <div>
                    What areas could you improve on?
                </div>
                <select>
                    <option value='Goal1'>On time</option>
                    <option value='Goal1'>Procrastination</option>
                    <option value='Goal1'>Attention to detail</option>
                    <option value='Goal1'>Communicating with coworkers</option>
                </select>
            </div>
            <button className='review-edit-submit-button'>Submit</button>
        </div>
    );
}