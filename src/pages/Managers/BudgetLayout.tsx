import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { MdPiano } from 'react-icons/md';
import CompPlanningTable from '../../components/CompPlanningTable';
import { meritAdjustment, percentageAdjustment } from '../../components/CompPlanningTable/CompAdjustmentCalculators';
import MeritIncreaseEditor from '../../components/CompPlanningTable/MeritIncreaseEditor';
import ProgressBar from '../../components/ProgressBar';
import { AppliedAdjustment, BudgetData, MeritIncreaseSetting } from '../../types';

import './BudgetLayout.css';
import { renderInflationIncreaseText, renderMeritIncreaseText, renderPolicyIncreaseText } from './BudgetLayoutDescriptions';

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

const defaultMeritIncreaseSettings: MeritIncreaseSetting[] = [
    {
        scoreStart: 2,
        scoreEnd: 4,
        percentageIncrease: 12,
    },
    {
        scoreStart: 5,
        scoreEnd: 8,
        percentageIncrease: 16,
    },
    {
        scoreStart: 9,
        scoreEnd: 10,
        percentageIncrease: 18,
    },
];

export default function BudgetLayout() {
    type MarketIncreaseType = 'None' | 'Inflation' | 'Percentage';

    const [appliedAdjustments, setAppliedAdjustment] = useState<Array<AppliedAdjustment>>([]); 
    const [simplePercentage, setSimplePercentage] = useState(.03);
    const [budget, setBudget] = useState(0);
    const [budgetUsed, setBudgetUsed] = useState(23456);
    const [showMeritIncrease, setShowMeritIncrease] = useState(false);
    const [showMarketIncrease, setShowMarketIncrease] = useState(false);
    const [marketIncreaseType, setMarketIncreaseType] = useState<MarketIncreaseType>('None');
    const [marketPercentageIncrease, setMarketPercentageIncrease] = useState(0);
    const [meritIncreaseSettings, setMeritIncreaseSettings] = useState<MeritIncreaseSetting[]>(defaultMeritIncreaseSettings);
    const [includeMeritIncrease, setIncludeMeritIncrease] = useState(false);
    const inflation = 6.5;

    useEffect(() => {
        let total = 0;
        sample_data.forEach(sd => {
            appliedAdjustments.forEach(aa => {
                total += aa.adjustmentsByEmail[sd.email] ?
                    aa.adjustmentsByEmail[sd.email].dollarAmt : 0
            });
        });
        setBudgetUsed(total);
    }, [appliedAdjustments]);

    useEffect(() => {
        let mpi = marketPercentageIncrease;
        if (marketIncreaseType === 'Inflation') {
            setMarketPercentageIncrease(inflation);
            mpi = inflation;
        }

        const aa = [];
        if (marketIncreaseType !== 'None') {
            aa.push(percentageAdjustment(mpi, sample_data));
        }

        if (includeMeritIncrease) {
            aa.push(meritAdjustment(meritIncreaseSettings, sample_data));
        }

        setAppliedAdjustment(aa);
    }, [marketIncreaseType, includeMeritIncrease, meritIncreaseSettings, marketPercentageIncrease])

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

    const onShowMeritIncreaseClick = () => {
        setShowMarketIncrease(false);
        setShowMeritIncrease(!showMeritIncrease);
    }

    const onShowMarketIncreaseClick = () => {
        setShowMeritIncrease(false);
        setShowMarketIncrease(!showMarketIncrease);
    }

    const onMarketIncreaseTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMarketIncreaseType(e.target.value as MarketIncreaseType);
    }

    const onMarketIncreasePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMarketPercentageIncrease(e.target.valueAsNumber);
    }

    const renderMarketIncreaseEditor = () => {
        return(
            <div>
                {renderPolicyIncreaseText()}
                {renderInflationIncreaseText()}
                <TextField
                    type='number'
                    value={marketPercentageIncrease}
                    disabled={marketIncreaseType === 'Inflation'}
                    label='Percentage increase'
                    onChange={onMarketIncreasePercentageChange}
                />

                <FormControl>
                    <FormLabel>
                        <RadioGroup
                            row
                            name='market-increase-group'
                            value={marketIncreaseType}
                            onChange={onMarketIncreaseTypeChange}
                        >
                            <FormControlLabel value="None" control={<Radio />} label='None'/>
                            <FormControlLabel value="Percentage" control={<Radio />} label='Company Policy'/>
                            <FormControlLabel value="Inflation" control={<Radio />} label='Inflation'/>
                        </RadioGroup>
                    </FormLabel>
                </FormControl>
            </div>
        )
    }

    const renderMeritIncreaseEditor = () => {
        return(
            <div>
                {renderMeritIncreaseText()}
                <MeritIncreaseEditor 
                    meritIncreaseSettings={meritIncreaseSettings}
                    onMeritIncreaseSettingsUpdate={(mis) => setMeritIncreaseSettings(mis)}
                    includeMeritIncrease={includeMeritIncrease}
                    onIncludeMeritIncreaseUpdate={setIncludeMeritIncrease}
                />
            </div>
        )
    }
    
    return(
        <div className='budget-layout-container'>
            <h3>Plan Your Team's Expected Increases</h3>
            <div className='budget-layout-budget-progress'>
                <TextField
                    type="number"
                    value={budget}
                    label={"Enter budget for updates"}
                    onChange={onBudgetChange}
                />
                <ProgressBar 
                    progress={Math.min(100, budgetUsed / budget * 100)} 
                    description={`Budget used (${budgetUsed})`}
                />
            </div>
            <div className='budget-layout-insert-adjustment-buttons'>
                <Button
                    className='budget-layout-button'
                    variant="contained" 
                    sx={{background: "#041F4C", margin: '16px'}}
                    onClick={onShowMeritIncreaseClick}
                >
                    Insert Merit Increase
                </Button>
                <Button
                    className='budget-layout-button'
                    variant="contained" 
                    sx={{background: "#041F4C", margin: '16px'}}
                    onClick={onShowMarketIncreaseClick}
                >
                    Insert Market Increase
                </Button>
            </div>
            {showMarketIncrease && renderMarketIncreaseEditor()}
            {showMeritIncrease && renderMeritIncreaseEditor()}
            {/* <div>
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
            </div> */}
            
            <CompPlanningTable appliedAdjustments={appliedAdjustments} data={sample_data}/>
        </div>
    );
}