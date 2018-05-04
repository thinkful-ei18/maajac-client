import React from 'react';
import { shallow } from 'enzyme';

import GoogleMapComponent from '../src/components/googleMap';

describe('<Home />', () => {
  it('renders without crashing', () => {
    shallow(<GoogleMapComponent />)
  })
})
