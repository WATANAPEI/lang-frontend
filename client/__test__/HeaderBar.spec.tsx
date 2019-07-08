import React from "react";
import { createShallow, createMount } from "@material-ui/core/test-utils";
// @ts-ignore
import HeaderBar from "../components/HeaderBar.tsx";
import AppBar from "@material-ui/core/AppBar";

describe("HeaderBar", () => {
  it("display the received text", () => {
    const testStr = "this is test";
    const wrapper = createShallow()(<HeaderBar text={testStr} />);
    expect(wrapper.text()).toEqual(testStr);
//    expect(shallow).toMatchSnapshot();
  });

  it("has an AppBar", () => {
    const testStr = "this is test";
    const wrapper = createMount()(<HeaderBar text={testStr} />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });
});
