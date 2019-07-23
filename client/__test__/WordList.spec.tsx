import React from "react";
import { act } from "react-dom/test-utils";
// @ts-ignore
import WordList from "../components/WordList.tsx";
import { createMount } from "@material-ui/core/test-utils";
// @ts-ignore
import { WordResponse } from "../hooks/useWordApi.tsx";
// @ts-ignore
import { mockWordsFactory, MockFetch } from "./MockFactory.tsx";
import "isomorphic-fetch";
import Paper from "@material-ui/core/Paper";

describe("<WordList />", () => {
  it("has Progress indication and Paper will appear after loading", done => {
    const mockUrlList = [
        "http://127.0.0.1:3000/words"
    ];
    let mockWordsArray: WordResponse[][] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordsArray[i], mockFetchArray[i]] = mockWordsFactory(
        "success",
        i,
        mockUrlList[i]
      );
    }
    window.fetch = jest.fn().
      mockImplementationOnce(mockFetchArray[0]);
    const fetchSpy = jest.spyOn(window, "fetch");

    act(() => {
      const wrapper = createMount()(<WordList />);
      setImmediate(() => {
        //console.log(wrapper.debug());
        expect(wrapper.find("#loadingMessage").exists()).toEqual(true);
        expect(wrapper).toMatchSnapshot();
        wrapper.update();
        //console.log(wrapper.debug());
        //console.log(mockWordsArray[0]);
        expect(wrapper.find(Paper)).toHaveLength(mockWordsArray[0].length);
        expect(wrapper.find(".word_id").exists()).toEqual(true);
        expect(wrapper.find(".word_word").exists()).toEqual(true);
        expect(wrapper.find(".word_meaning").exists()).toEqual(true);
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenLastCalledWith(mockUrlList[0]);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
        done();
      });
    });
  });
  it("render error message when data loading failed", done => {
    const mockUrlList = [
        "http://127.0.0.1:3000/words"
    ];
    let mockWordsArray: WordResponse[][] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordsArray[i], mockFetchArray[i]] = mockWordsFactory(
        "failed",
        i,
        mockUrlList[i]
      );
    }
    window.fetch = jest.fn().
      mockImplementationOnce(mockFetchArray[0]);
    const fetchSpy = jest.spyOn(window, "fetch");

    act(() => {
      const wrapper = createMount()(<WordList />);
      setImmediate(() => {
        wrapper.update();
        //console.log(wrapper.debug());
        expect(wrapper.find("#loadingErrorMessage").exists()).toEqual(true);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
        done();
      });
    });
  });
});
