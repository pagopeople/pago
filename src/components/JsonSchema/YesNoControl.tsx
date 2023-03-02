import { OwnPropsOfControl } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { YesNo } from './YesNo';

interface YesNoProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const RatingControl = (props: OwnPropsOfControl & YesNoProps & {readOnly?: boolean}) => {
  const { data, handleChange, path, enabled } = props;

  const getOptions = (start: number = 1, end: number = 10) => {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start)
  }
  return(
    <YesNo
        value={data}
        updateValue={(newValue: boolean) => handleChange(path, newValue)}
        title={props.uischema?.label === undefined ? props.schema?.title : `${props.uischema.label}`}
        enabled={enabled}
    />
    // <NumberRating
    //   value={data}
    //   updateValue={(newValue: number) => handleChange(path, newValue)}
    //   maxVal={props.schema?.maximum}
    //   options={getOptions(props.schema?.minimum, props.schema?.maximum)}
    //   startHint={props.uischema?.options?.startHint}
    //   endHint={props.uischema?.options?.endHint}
    //   title={props.uischema?.label === undefined ? props.schema?.title : `${props.uischema.label}`}
    //   enabled={enabled}
    // />
  );
};

export default withJsonFormsControlProps(RatingControl);