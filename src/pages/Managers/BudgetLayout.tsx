import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import CompPlanningTable from '../../components/CompPlanningTable';
import { meritAdjustment, percentageAdjustment } from '../../components/CompPlanningTable/CompAdjustmentCalculators';
import MeritIncreaseEditor from '../../components/CompPlanningTable/MeritIncreaseEditor';
import ProgressBar from '../../components/ProgressBar';
import { AppliedAdjustment, BudgetData, MeritIncreaseSetting } from '../../types';



const sample_data: BudgetData[] = [
    {
        "email": "monte@pagopeople.com",
        "firstName": "Dymonte",
        "lastName": "Misa",
        "salary": 120000,
        "score": 5,
        "managerName": "Steve Jobs"
    },
    {
        "email": "montemisa@gmail.com",
        "firstName": "Steve",
        "lastName": "Jobs",
        "salary": 100000,
        "score": 5,
        "managerName": "Dymonte Misa"
    }

];

const meritIncreaseSettings: MeritIncreaseSetting[] = [
    {
        scoreStart: 2,
        scoreEnd: 4,
        percentageIncrease: .12,
    },
    {
        scoreStart: 5,
        scoreEnd: 8,
        percentageIncrease: .16,
    },
    {
        scoreStart: 9,
        scoreEnd: 10,
        percentageIncrease: .18,
    },
];

export default function BudgetLayout() {

    const [appliedAdjustments, setAppliedAdjustment] = useState<Array<AppliedAdjustment>>([]); 
    const [simplePercentage, setSimplePercentage] = useState(.03);
    const [budget, setBudget] = useState(0);
    const [budgetUsed, setBudgetUsed] = useState(23456);
    const inflation = .065;

    const onAddMeritIncreaseClick = () => {
        setAppliedAdjustment([...appliedAdjustments, meritAdjustment(meritIncreaseSettings, sample_data)]);
    }

    const onAddInflationIncreaseClick = () => {
        setAppliedAdjustment([...appliedAdjustments, percentageAdjustment(inflation, sample_data)]);
    }

    const onAddPercentageIncreaseClick = () => {
        setAppliedAdjustment([...appliedAdjustments, percentageAdjustment(simplePercentage, sample_data)])
    }

    const onBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    }

    useEffect(() => {
        let total = 0;
        sample_data.forEach(sd => {
            appliedAdjustments.forEach(aa => {
                total += aa.adjustmentsByEmail[sd.email] ?
                    aa.adjustmentsByEmail[sd.email].dollarAmt : 0
            });
        });
        setBudgetUsed(total);
    }, [appliedAdjustments])
    
    return(
        <div className='budget-layout-container'>
            <p>Plan how to reward your team for their hard work.</p>
            <p>Run one or more of the adjustments below to see how it would fit within your budget</p>
            <TextField
                type="number"
                value={budget}
                label={"Enter budget for updates"}
                onChange={onBudgetChange}
            />
            <ProgressBar progress={Math.min(100, budgetUsed / budget * 100)} description={`Budget used (${budgetUsed})`}/>

            <div>
                <Button
                    className='account-upload-data-button'
                    variant="contained" 
                    sx={{background: "#041F4C"}}
                    onClick={onAddMeritIncreaseClick}
                >
                    Add Merit Increase
                </Button>
                <Button
                    className='account-upload-data-button'
                    variant="contained" 
                    sx={{background: "#041F4C"}}
                    onClick={onAddInflationIncreaseClick}
                >
                    Add Inflation Increase
                </Button>
                <Button
                    className='account-upload-data-button'
                    variant="contained" 
                    sx={{background: "#041F4C"}}
                    onClick={onAddPercentageIncreaseClick}
                >
                    Add Simple Percentage Increase
                </Button>
            </div>
            
            <MeritIncreaseEditor meritIncreaseSettings={meritIncreaseSettings}/>
            <CompPlanningTable appliedAdjustments={appliedAdjustments} data={sample_data}/>
        </div>
    );
}