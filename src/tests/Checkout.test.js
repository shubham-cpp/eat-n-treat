import React from 'react';
import renderer from 'react-test-renderer';

import Checkout from '../components/Checkout';

it('Testing Checkout.jsx snapshot', () => {
    if(localStorage.getItem("cart") === null || JSON.parse(localStorage.getItem("cart")).length === 0) {
        localStorage.setItem("cart", JSON.stringify([
            {
                "menuName": "Chai",
                "menuPrice": 20,
                "_id": "614d7b246f174a678b9ba230",
                "qty": 4
            },
            {
                "menuPrice": 40,
                "menuName": "Cold Coffe",
                "_id": "614ded911ce7a88f83bbc55b",
                "qty": 1
            }
        ]))
    }

    console.log(JSON.parse(localStorage.getItem("cart")))

    const tree = renderer.create(<Checkout />).toJSON();
    expect(tree).toMatchSnapshot()
})