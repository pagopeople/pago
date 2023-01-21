import { JsonForms } from '@jsonforms/react';
import React, { useState } from 'react';
import schema from './schema.json';
import uischema from './uischema.json';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';

import NumberRatingControl from '../NumberRating/NumberRatingControl';

import NumberRatingControlTester from '../NumberRating/NumberRatingControlTester';

interface Props {
  data: any;
  onUpdate: (data: any) => void;
  readonly?: boolean;
}
export default function ReviewForm(props: Props) {
  const {
    data,
    onUpdate,
    readonly
  } = props;

  const renderers = [
    ...materialRenderers,
    //register custom renderers
    { tester: NumberRatingControlTester, renderer: NumberRatingControl },
  ];


  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ errors, data }) => onUpdate(data)}
        readonly={readonly}
      />
    </div>
  )
}