import React from 'react';
import HomeWidget from '../../components/HomeWidget';
import ProgressBar from '../../components/ProgressBar';
import ProgressCircle from '../../components/ProgressCircle';

import './Home.css';

export default function Home() {
    return(
        <div className='home-container'>
            <div className='home-row'>
                <HomeWidget 
                    mainText='Employee Dashboard' 
                    subText='View Pay, Performance, Projects, and Skills'
                >
                    <ProgressCircle progress={60} />
                </HomeWidget>
                <HomeWidget 
                    mainText='Performance Dashboard'
                    subText='See how you performed and how each project affects your pay'    
                >
                    <>
                        <ProgressBar progress={80}/>
                        <ProgressBar progress={50}/>
                        <ProgressBar progress={90}/>
                        <ProgressBar progress={30}/>
                    </>
                </HomeWidget>
                <HomeWidget 
                    mainText='Pay Dashboard' 
                    subText='See how much you are paid and where you are on your pay band'
                >
                    <ProgressCircle description='Total Compensation' progress={60} styles={{text: {fill: '#041F4C', fontSize: '7px', fontWeight: 600}}} />
                </HomeWidget>
                
            </div>
        </div>
    )
}