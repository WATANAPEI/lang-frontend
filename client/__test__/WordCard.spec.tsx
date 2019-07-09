import React from "react";
import { mount } from "enzyme";
// @ts-ignore
import WordCard from "../components/WordCard.tsx";

interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

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
    console.log(`wrapper: ${wrapper.debug()}`);
  });
});
