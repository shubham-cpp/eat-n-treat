import React from "react";
import expect from "expect";
import Enzyme, { shallow } from "enzyme";
import OrderIns from "./OrderIns";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe("order instructions", () => {
  it("Order instructions to be placed", () => {
    const wrapper = shallow(<OrderIns />);
    expect(wrapper.containsMatchingElement(<li>login using Email</li>)).toBe(
      true
    );
    expect(wrapper.find("div").length).toEqual(1);
  });
});
