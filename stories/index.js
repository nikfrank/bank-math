import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ResultsPage from './ResultsPage';

storiesOf('load payment schedule', module)
  .add('from static data', () => (
    <ResultsPage/>
  ));
