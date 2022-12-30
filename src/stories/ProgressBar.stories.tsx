import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProgressBar from '../components/ProgressBar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/PB',
  component: ProgressBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProgressBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  progress: 90,
};

export const Secondary = Template.bind({});
Secondary.args = {
  progress: 50,
  description: 'Average 3.7',
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
