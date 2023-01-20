import { OwnPropsOfControl } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { NumberRating } from './NumberRating';

interface RatingControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const RatingControl = (props: OwnPropsOfControl & RatingControlProps) => {
  const { data, handleChange, path } = props;

  const getOptions = (start: number = 1, end: number = 10) => {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start)
  }
  return(<NumberRating
    value={data}
    updateValue={(newValue: number) => handleChange(path, newValue)}
    maxVal={props.schema?.maximum}
    options={getOptions(props.schema?.minimum, props.schema?.maximum)}
    startHint={props.uischema?.options?.startHint}
    endHint={props.uischema?.options?.endHint}
    title={props.schema?.title}
  />);
};

export default withJsonFormsControlProps(RatingControl);