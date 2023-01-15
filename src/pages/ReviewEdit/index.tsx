import React, {useState, ChangeEvent} from 'react';
import BinaryWithFollowUp from '../../components/BinaryWithFollowUp';
import ChoiceList from '../../components/ChoiceList';
import { useAppSelector } from '../../hooks';
import { ProjectSize, Review } from '../../types';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import './ReviewEdit.css';

export default function ReviewEdit() {
    const reviewsState = useAppSelector((state) => state.reviewsState);

    const [hasDeadline, setHadDeadline] = useState<boolean | undefined>(undefined)
    const [deadlineVal, setDeadlineVal] = useState('');
    const optionsOneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [selectedVal, setSelectedVal] = useState<string | number | undefined>();
    const [review, setReview] = useState<Review | undefined>(reviewsState.activeReview);
    
    
    const getProjectSizeOptions = () => {
        const options:React.ReactNode[] = [];
        for (const ps in ProjectSize) {
            if (isNaN(Number(ps))) {
                continue;
            }
            options.push(<option key={ps} value={ps}>{ProjectSize[ps]}</option>)
        }
        return options;
    };

    const changeEventHandler = (callback: (val: string) => void) => {
        return (evt: ChangeEvent<HTMLInputElement>) => callback(evt.currentTarget.value);
    }

    return(
        <div className='review-edit-container'>
            <div>
                <div>
                    What is the project called?
                </div>
                <input 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setReview({...review, projectName: e.currentTarget.value})}
                    value={review?.projectName} 
                    type='text'
                />
            </div>
            <div>
                <div>
                    Brief description of the project
                </div>
                <textarea
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReview({...review, projectDescription: e.currentTarget.value})}
                    value={review?.projectDescription}
                    cols={50}
                />
            </div>
            <div>
                <div>
                    What company goal does this project work towards?
                </div>
                <select value={review?.companyGoal} onChange={(e: any) => setReview({...review, companyGoal: e.currentTarget.value})}>
                    <option value={undefined}> Select goal </option>
                    <option value='Goal1'>The promotion goal</option>
                    <option value='Goal2'>The demotion goal</option>
                    <option value='Goal3'>The ipo goal</option>
                    <option value='Goal4'>The bankrupt goal</option>
                </select>
            </div>
            <div>
                <div>
                    How big of a project is this?
                </div>
                <select 
                    defaultValue={undefined}
                    value={review?.projectSize ? ProjectSize[review?.projectSize] : undefined} 
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setReview({...review, projectSize: ProjectSize[e.currentTarget.value as keyof typeof ProjectSize]})}
                >
                    <option value={undefined}> Select size </option>
                    {getProjectSizeOptions()}
                </select>
            </div>
            <div>
                <div>
                    How many hours did this project take?
                </div>
                <input 
                    value={review?.hoursSpent}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setReview({...review, hoursSpent: Number(e.currentTarget.value)})}  
                    type='number' 
                />
            </div>
            <div>
                <div>
                    Did the project have a deadline?
                </div>
                <BinaryWithFollowUp 
                    trueText='Yes'
                    falseText='No'
                    selected={review?.deadline}
                    onSelectedUpdate={(deadline: boolean) => setReview({...review, deadline})}
                >
                    <DatePicker 
                        selected={review?.deadlineDate ? new Date(review?.deadlineDate) : null} 
                        onChange={(date: Date) => setReview({...review, deadlineDate: date.getTime()})} 
                        showTimeSelect
                        placeholderText='If yes, enter deadline'
                    />
                </BinaryWithFollowUp>
            </div>
            <div>
                <div>
                    Was the project completed on or ahead of schedule? If not, what happened?
                </div>
                <BinaryWithFollowUp 
                    trueText='Yes'
                    falseText='No'
                    selected={review?.onSchedule}
                    onSelectedUpdate={(onSchedule: boolean) => setReview({...review, onSchedule})}
                >
                    <input 
                        onChange={changeEventHandler((onScheduleReason: string) => setReview({...review, onScheduleReason}))} 
                        value={review?.onScheduleReason} 
                        type='text' 
                        placeholder={'If No, what happened?'} 
                    />
                </BinaryWithFollowUp>
            </div>
            <div>
                <div>
                    How closely did the project you completed match what was needed?
                </div>
                <ChoiceList 
                    startHint={'Not close'}
                    endHint={'Exactly what was needed'}
                    options={optionsOneToTen}
                    selectedVal={review?.matchScore}
                    onSelectedValChange={(val: string | number) => setReview({...review, matchScore: val as number})} 
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
                    selectedVal={review?.clarityScore}
                    onSelectedValChange={(val: string | number) => setReview({...review, clarityScore: val as number})} 
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
                    selectedVal={review?.errorsScore}
                    onSelectedValChange={(val: string | number) => setReview({...review, errorsScore: val as number})} 
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
                    selectedVal={review?.managerInvolvementScore}
                    onSelectedValChange={(val: string | number) => setReview({...review, managerInvolvementScore: val as number})} 
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
                    selectedVal={review?.desiredManagerInvolvementScore}
                    onSelectedValChange={(val: string | number) => setReview({...review, desiredManagerInvolvementScore: val as number})}  
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
                    selectedVal={review?.managerInvolvmentOpinionScore}
                    onSelectedValChange={(val: string | number) => setReview({...review, managerInvolvmentOpinionScore: val as number})}   
                />
            </div>
            <div>
                <div>
                    Did you work with any coworkers?
                </div>

                <BinaryWithFollowUp 
                    trueText='Yes'
                    falseText='No'
                    selected={review?.withCoworker}
                    onSelectedUpdate={(withCoworker: boolean) => setReview({...review, withCoworker})}
                >
                    <select 
                        value={review?.coworkerName} 
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setReview({...review, coworkerName: e.currentTarget.value})}>
                        <option value={undefined}> Select if yes </option>
                        <option value='pago1'>John</option>
                        <option value='pago2'>Monte</option>
                        <option value='pago3'>Spencer</option>
                        <option value='pago4'>Stephen</option>
                    </select>
                </BinaryWithFollowUp>
               
            </div>
            <div>
                <div>
                    How did your coworkers perform?
                </div>
                <ChoiceList 
                    startHint={'Poorly'}
                    endHint={'Exceptional'}
                    options={optionsOneToTen}
                    selectedVal={review?.coworkerPerformance}
                    onSelectedValChange={(val: string | number) => setReview({...review, coworkerPerformance: val as number})}   
                />
            </div>
            <div>
                <div>
                    What skills did you use to finish the project?
                </div>
                <select 
                    value={review?.skillsUsed} 
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setReview({...review, skillsUsed: e.currentTarget.value})}
                >
                    <option value={undefined}> Select skill </option>
                    <option value='skill2'>Knife</option>
                    <option value='skill3'>People</option>
                    <option value='skill4'>Cooking</option>
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
                    selectedVal={review?.skillProficiency}
                    onSelectedValChange={(val: string | number) => setReview({...review, skillProficiency: val as number})}  
                />
            </div>
            <div>
                <div>
                    What areas could you improve on?
                </div>
                <select 
                    value={review?.improvementAreas} 
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setReview({...review, improvementAreas: e.currentTarget.value})}
                >
                    <option value={undefined}> Select area </option>
                    <option value='area1'>On time</option>
                    <option value='area2'>Procrastination</option>
                    <option value='area3'>Attention to detail</option>
                    <option value='area4'>Communicating with coworkers</option>
                </select>
            </div>
            <button className='review-edit-submit-button'>Submit</button>
        </div>
    );
}