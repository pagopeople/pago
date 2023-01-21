import { JsonForms } from '@jsonforms/react';
import React, { useState } from 'react';
import SchemaFetcher from '../../reviewSchemas/SchemaFetcher';
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
  reviewSchemaId?: string;
}
export default function ReviewForm(props: Props) {
  const {
    data,
    onUpdate,
    readonly,
    reviewSchemaId,
  } = props;

  const renderers = [
    ...materialRenderers,
    //register custom renderers
    { tester: NumberRatingControlTester, renderer: NumberRatingControl },
  ];

  const schema = SchemaFetcher.getJsonSchema();
  const uischema = SchemaFetcher.getUiSchemaWithId(reviewSchemaId || '1');


  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ errors, data }) => {console.log(errors); console.log(data); onUpdate(data)}}
        readonly={readonly}
      />
    </div>
  )
}