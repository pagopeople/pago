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

const initialData = {
    name: 'Send email to Adrian',
    description: 'Confirm if you have passed the subject\nHereby ...',
    done: true,
    recurrence: 'Daily',
    rating: 3,
  };

export default function ReviewForm() {

    const [data, setData] = useState<any>(initialData);

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
              onChange={({ errors, data }) => setData(data)}
            />
        </div>
    )
}