import React from "react";
import { act } from "react-dom/test-utils";
// @ts-ignore
import Main from "../components/Main.tsx";
import { createMount } from "@material-ui/core/test-utils";
import { ReactWrapper } from "enzyme";
// @ts-ignore
import { mockFactory, MockFetch } from "../utils/mockFactory";
// @ts-ignore
import { WordResponse } from "../hooks/useWordApi.tsx";
// @ts-ignore
import WordCard from "../components/WordCard.tsx";
import "isomorphic-fetch";

describe("<Main />", () => {
  describe("this checks successive button clicks", () => {
    const mockUrlList = [
      "http://localhost:3000/words/1",
      "http://localhost:3000/words/2",
      "http://localhost:3000/words/3",
      "http://localhost:3000/words/2",
      "http://localhost:3000/words/1"
    ];
    let mockWordArray: WordResponse[] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordArray[i], mockFetchArray[i]] = mockFactory(
        "success",
        i,
        mockUrlList[i]
      );
    }
    window.fetch = jest.fn().
      mockImplementationOnce(mockFetchArray[0]).
      mockImplementationOnce(mockFetchArray[1]).
      mockImplementationOnce(mockFetchArray[2]).
      mockImplementationOnce(mockFetchArray[3]).
      mockImplementationOnce(mockFetchArray[4]);
    const fetchSpy = jest.spyOn(window, "fetch");
    let wrapper: ReactWrapper;
    it("mounts Main", done => {
      act(() => {
        wrapper = createMount()(<Main />);
        setImmediate(() => {
          wrapper.update();
          console.log(wrapper.debug());
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[0]);
          expect(wrapper.find(".flipCardFront").text()).toEqual(mockWordArray[0].word);
          done();
        });
      });
    });
    it("loads next WordCard when next button clicked", done => {
      act(() => {
        wrapper.find("button#nextButton").simulate("click");
        setImmediate(() => {
          wrapper.update();
          console.log(wrapper.debug());
          expect(fetchSpy).toHaveBeenCalledTimes(2);
          expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[1]);
          expect(wrapper.find(".flipCardFront").text()).toEqual(mockWordArray[1].word);
          done();
        });
      });
    });
    it("loads next WordCard by clicking again", done => {
      act(() => {
        wrapper.find("button#nextButton").simulate("click");
        setImmediate(() => {
          wrapper.update();
          console.log(wrapper.debug());
          expect(fetchSpy).toHaveBeenCalledTimes(3);
          expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[2]);
          expect(wrapper.find(".flipCardFront").text()).toEqual(mockWordArray[2].word);
          done();
        });
      });
    });
    it("loads previous WordCard when prevButton clicked", done => {
      act(() => {
        wrapper.find("button#prevButton").simulate("click");
        setImmediate(() => {
          wrapper.update();
          console.log(wrapper.debug());
          expect(fetchSpy).toHaveBeenCalledTimes(4);
          expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[3]);
          expect(wrapper.find(".flipCardFront").text()).toEqual(mockWordArray[3].word);
          done();
        });
      });
    });
    it("loads previous WordCard by clicking prevButton agin", done => {
      act(() => {
        wrapper.find("button#prevButton").simulate("click");
        setImmediate(() => {
          wrapper.update();
          console.log(wrapper.debug());
          expect(fetchSpy).toHaveBeenCalledTimes(5);
          expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[4]);
          expect(wrapper.find(".flipCardFront").text()).toEqual(mockWordArray[4].word);
          wrapper.unmount();
          jest.clearAllMocks();
          done();
        });
      });
    });
  });
  describe("temp", () => {
    it("has back button, WordCard, forward button after loads complete", done => {
      const mockUrlList = [
        "http://localhost:3000/words/1",
        "http://localhost:3000/words/2",
        "http://localhost:3000/words/3"
      ];
      let mockWordArray: WordResponse[] = [];
      let mockFetchArray: MockFetch[] = [];
      for (let i = 0; i < mockUrlList.length; i++) {
        [mockWordArray[i], mockFetchArray[i]] = mockFactory(
          "success",
          i,
          mockUrlList[i]
        );
      }
      window.fetch = jest.fn().
        mockImplementationOnce(mockFetchArray[0]).
        mockImplementationOnce(mockFetchArray[1]).
        mockImplementationOnce(mockFetchArray[2]);
      const fetchSpy = jest.spyOn(window, "fetch");
      act(() => {
        const wrapper = createMount()(<Main />);
        setImmediate(() => {
          wrapper.update();
          //console.log(wrapper.debug());
          expect(wrapper.find("#prevButton").exists()).toEqual(true);
          expect(wrapper.find("#mainGrid").exists()).toEqual(true);
          expect(wrapper.find("#loadingErrorMessage").exists()).toEqual(false);
          expect(wrapper.find("#nextButton").exists()).toEqual(true);
          wrapper.unmount();
          done();
        });
      });
      jest.clearAllMocks();
    });
  });
  it.todo("loads previous WordCard when prevButton was clicked");
  it.todo("displays error message when loads failed");
  it.todo("displays loading message during load");
});
