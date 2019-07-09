import React from "react";
import { mount } from "enzyme";
// @ts-ignore
import WordCard from "../components/WordCard.tsx";
// @ts-ignore
import { WordResponse } from "../components/WordCard.tsx";

describe("<WordCard />", () => {
  let testWord: WordResponse;
  beforeEach(() => {
    testWord = {
      id: 1,
      word: "test word",
      meaning: "test meaning",
      wordLanguageID: 1,
      meaningLanguageID: 2
    };
  });

  it("has 4 divs with flipCard/flipCardInner/flipCardFront/flipCardBack class", () => {
    const wrapper = mount(<WordCard {...testWord} />);
    expect(wrapper.find(".flipCard")).toHaveLength(1);
    expect(wrapper.find(".flipCardInner")).toHaveLength(1);
    expect(wrapper.find(".flipCardFront")).toHaveLength(1);
    expect(wrapper.find(".flipCardBack")).toHaveLength(1);
    //console.log(`wrapper: ${wrapper.debug()}`);
    wrapper.unmount();
  });

  it("has a card with word", () => {
    const wrapper = mount(<WordCard {...testWord} />);
    expect(wrapper.find(".flipCardFront").text()).toEqual(testWord.word);
    wrapper.unmount();
  });

  it("has a card with meaning", () => {
    const wrapper = mount(<WordCard {...testWord} />);
    expect(wrapper.find(".flipCardBack").text()).toEqual(testWord.meaning);
    wrapper.unmount();
  });

  it("changes the state when clicked", () => {
    const wrapper = mount(<WordCard {...testWord} />);
//    const spy = jest.spyOn(wrapper, "
//    expect(wrapper.state("isFlipped")).toEqual(false);

  });
});
