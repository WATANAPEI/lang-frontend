import React from "react";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import { shallow, mount } from "enzyme";
// @ts-ignore
import App from "../components/App.tsx";

describe("<App />", () => {
  const wrapper = createShallow()(<App />);
  it("has HeaderBar with a title text", () => {
    expect(wrapper.find("HeaderBar").text()).toBeTruthy();
  });
  it("has SideBar with a text", () => {
    expect(wrapper.find("SideBar").text()).toBeTruthy();
  });
  it("has Main component", () => {
    expect(wrapper.find("Main").exists()).toEqual(true);
  });
});
