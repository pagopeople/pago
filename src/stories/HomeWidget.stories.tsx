import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HomeWidget from '../components/HomeWidget';
import ProgressCircle from '../components/ProgressCircle';
import ProgressBar from '../components/ProgressBar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/HomeWidget',
  component: HomeWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof HomeWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HomeWidget> = (args) => <HomeWidget {...args} />;

export const CircularProgress = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CircularProgress.args = {
  children: <ProgressCircle progress={45}  />,
  mainText: 'Employee Dashboard',
  subText: 'View Pay, Performance, Projects, and Skills'
};


export const ProgressBars = Template.bind({});
ProgressBars.args = {
  children: <div>
    <ProgressBar progress={80}/>
    <ProgressBar progress={50}/>
    <ProgressBar progress={90}/>
    <ProgressBar progress={30}/>
    </div>,
  mainText: 'Performance Dashboard',
  subText: 'See how you performed and how each project affects your pay',
};

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
