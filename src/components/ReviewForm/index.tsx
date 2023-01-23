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
  const cultureUiSchema = SchemaFetcher.getUiSchemaWithId('culture');

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const schem = {...uischema, elements: [...uischema.elements]}

  const idx1 = getRandomInt(cultureUiSchema.elements.length);
  const idx2 = getRandomInt(cultureUiSchema.elements.length);

  schem.elements.push(cultureUiSchema.elements[0]);
  schem.elements.push(cultureUiSchema.elements[idx2]);

  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={schem}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ errors, data }) => {console.log(errors); console.log(data); onUpdate(data)}}
        readonly={readonly}
      />
    </div>
  )
}