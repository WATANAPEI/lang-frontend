import React from "react";
import { mount, shallow } from "enzyme";
// @ts-ignore
import WordCard from "../components/WordCard.tsx";
// @ts-ignore
import { WordResponse } from "../components/WordCard.tsx";
import toJson from "enzyme-to-json";

describe("<WordCard />", () => {
  const testWord: WordResponse = {
    id: 1,
    word: "test word",
    meaning: "test meaning",
    wordLanguageID: 1,
    meaningLanguageID: 2
  };
  const wrapper = mount(<WordCard {...testWord} />);
  afterAll(() => {
    wrapper.unmount();
  })

  it("has 4 divs with flipCard/flipCardInner/flipCardFront/flipCardBack class", () => {
    expect(wrapper.find("div.flipCard")).toHaveLength(1);
    expect(wrapper.find("div.flipCardInner")).toHaveLength(1);
    expect(wrapper.find("div.flipCardFront")).toHaveLength(1);
    expect(wrapper.find("div.flipCardBack")).toHaveLength(1);
    //console.log(`wrapper: ${wrapper.debug()}`);
    expect(wrapper).toMatchSnapshot();
  });

  it("has a card with word", () => {
    expect(wrapper.find(".flipCardFront").text()).toEqual(testWord.word);
  });

  it("has a card with meaning", () => {
    expect(wrapper.find(".flipCardBack").text()).toEqual(testWord.meaning);
  });

  it("check the mount rendering doesn't change before and after click", () => {
    const wrapperString = wrapper.debug();
    wrapper.find(".flipCardInner").simulate("click");
    expect(wrapper.debug()).toEqual(wrapperString);
    wrapper.find(".flipCardInner").simulate("click");
    expect(wrapper.debug()).toEqual(wrapperString);
  });
});
