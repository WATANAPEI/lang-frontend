import React from "react";
import { shallow } from "enzyme";
// @ts-ignore
import HeaderBar from "../components/HeaderBar.tsx";

describe("HeaderBar", () => {
  it("display the received text", () => {
    const testStr = "this is test";
    const headerBar = shallow(<HeaderBar text={testStr} />);

    expect(headerBar.text()).toEqual(testStr);
//    expect(shallow).toMatchSnapshot();
  });
});
