import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import restaurants from '../assets/data.json';

import RestaurantCard from '../components/RestaurantCard';

it('Card renders with appropriate restaurant data', () => {
    const tree = renderer.create(<BrowserRouter><RestaurantCard restaurant={ restaurants[0] }/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})