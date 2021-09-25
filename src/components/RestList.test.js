import React from 'react'
import Enzyme,{mount,shallow} from 'enzyme'
import RestarauntList from './RestaurantList'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter : new Adapter()})


describe("Restaraunt List",()=>{
    test("renders",()=>{
        const wrapper = shallow(<RestarauntList/>)
        expect(wrapper.exists()).toBe(true)
    })

    test("user text is echoed", () => {
        const wrapper = shallow(<RestarauntList performSearch={() => {}} />);
    
        wrapper.find("input").simulate("change", {
          target: { value: "hello" }
        });
    
        expect(wrapper.find("input").props().value).toEqual("hello");
      });
})