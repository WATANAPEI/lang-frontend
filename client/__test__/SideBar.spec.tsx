import React from "react";
import { createShallow, createMount } from "@material-ui/core/test-utils";
// @ts-ignore
import SideBar from "../components/SideBar.tsx";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

describe("</SideBar />", () => {
  it("has a MenuList and MenuItems", () => {
    const testText = "sideBar text";
    const wrapper = createShallow()(<SideBar text={testText} />);
    expect(wrapper.find(MenuList)).toHaveLength(1);
    expect(wrapper.find(MenuItem)).toBeTruthy();
  });
  it("render received texts", () => {
    const testText = "sideBar text";
    const wrapper = createShallow()(<SideBar text={testText} />);
//    console.log(wrapper.text());
    expect(wrapper.text()).toEqual(
      expect.stringContaining(testText));
  });
});
