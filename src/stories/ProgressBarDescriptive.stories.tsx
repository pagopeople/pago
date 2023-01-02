import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProgressBarDescriptive from '../components/ProgressBarDescriptive';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/PBD',
  component: ProgressBarDescriptive,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProgressBarDescriptive>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProgressBarDescriptive> = (args) => <ProgressBarDescriptive {...args} />;

export const NoDescription = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoDescription.args = {
  progress: 90,
};

export const DescriptionOnly = Template.bind({});
DescriptionOnly.args = {
  progress: 50,
  description: 'Your performance',
};


export const HelpLinkOnly = Template.bind({});
HelpLinkOnly.args = {
  progress: 45,
  helpLink: 'How is this calculated?',
};

export const HelpLinkAndProgressDescription = Template.bind({});
HelpLinkAndProgressDescription.args = {
  progress: 45,
  helpLink: 'How is this calculated?',
  progressDescription: 'Your average: 3.0',
};

export const Everything = Template.bind({});
Everything.args = {
  progress: 45,
  helpLink: 'How is this calculated?',
  progressDescription: 'Your average: 3.0',
  description: 'Your performance',
};


