import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, mount, ReactWrapper } from "enzyme";
// @ts-ignore
import useWordApi, { WordResponse, ReturnData } from "../hooks/useWordApi.tsx";
import "isomorphic-fetch";


interface UseWordApi {
  (initialUrl: string, initialWord: WordResponse): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

let mockWordSuccessResponse: WordResponse;
let mockWordFailedResponse;
let mockSuccessJsonPromise: Promise<WordResponse>;
let mockFailedJsonPromise: Promise<{}>;
let mockFetchPromise: (status: "success" | "fail") => Promise<Response>;
let mockSuccessResponse: Response;
let mockFailedResponse: Promise<{}>;
let myResponse: Response;
let mockSuccessFetch: () => Promise<Response>;
let mockFailedFetch: () => Promise<Response>;

describe("test hooks", () => {
  beforeEach(() => {
    mockWordSuccessResponse = {
      data: {
        id: 100,
        word: "sucess word",
        meaning: "success meaning",
        word_lang_id: 1,
        meaning_lang_id: 2
      }
    };
    mockWordFailedResponse = {};
    mockSuccessJsonPromise = Promise.resolve(mockWordSuccessResponse);
    mockFailedJsonPromise = Promise.resolve(mockWordFailedResponse);
//    mockSuccessResponse = new Response(
//      new Blob([JSON.stringify({ json: () => mockSuccessJsonPromise })], {
//        type: "application/json"
//      })
//    );
    let myBlob = "test";
    //mockSuccessResponse = Promise.resolve(mockSuccessJsonPromise);
    mockFailedResponse = Promise.resolve(mockFailedJsonPromise);
//    mockWordSuccessResponse = new Response();
    //mockSuccessResponse = new Response(myBlob);
    //mockFailedResponse = new Response(myBlob);
//      new Blob(JSON.stringify({ json: () => mockFailedJsonPromise }))
//    );

//    mockSuccessResponse = { json: () => mockSuccessJsonPromise };
//    mockFailedResponse = { json: () => mockFailedResponse };
    mockSuccessResponse = new Response();
    mockSuccessResponse.json = () => {
      return Promise.resolve(mockWordSuccessResponse);
    };
    mockSuccessFetch = async () => Promise.resolve(mockSuccessResponse);
    mockFailedFetch = async () => Promise.reject(mockFailedResponse);
    mockFetchPromise = (status: "success" | "fail") => {
      return new Promise((resolve, reject) => {
        if (status === "success") {
          resolve(myResponse);
        } else {
          reject(mockFailedResponse);
        }
      });
    };

    });

  it("returns WordResponse and setUrl function", done => {
    window.fetch = jest
      .fn(mockSuccessFetch);
    const spy = jest.spyOn(window, "fetch");
    function MockReactComponent() {
      const [{ word, isLoading, isError }, doFetch]: [
        ReturnData,
        React.Dispatch<React.SetStateAction<string>>
      ] = useWordApi("http://localhost:3000/words/1", {
        id: -1,
        word: "Initialize error",
        meaning: "Initialize error",
        word_lang_id: -1,
        meaning_lang_id: -1
      });
      return (
        <React.Fragment>
          <h1 id="id">{word.id}</h1>
          <h1 id="word">{word.word}</h1>
          <h1 id="meaning">{word.meaning}</h1>
          <h1 id="word_lang_id">{word.wordLanguageID}</h1>
          <h1 id="meaning_lang_id">{word.meaningLanguageID}</h1>
          <h1 id="isLoading">{isLoading}</h1>
          <h1 id="isError">{isError}</h1>
        </React.Fragment>);
    }
    let wrapper!: ReactWrapper;
    act(() => {
      wrapper = mount(<MockReactComponent />);
    setImmediate(() => {
      wrapper.update();
      console.log(wrapper.debug());
      expect(spy).toHaveBeenCalledTimes(1);
      expect(wrapper.find("#id").text()).toEqual(String(mockWordSuccessResponse.data.id));
      expect(wrapper.find("#word").text()).toEqual(mockWordSuccessResponse.data.word);
      expect(wrapper.find("#meaning").text()).toEqual(mockWordSuccessResponse.data.meaning);
      expect(wrapper.find("#word_lang_id").text()).toEqual(String(mockWordSuccessResponse.data.word_lang_id));
      expect(wrapper.find("#meaning_lang_id").text()).toEqual(String(mockWordSuccessResponse.data.meaning_lang_id));
      done();
    });
    });
  });
  it.todo("accesses specified url and return response");
  it.todo("display loading text during loading");
  it.todo("display error message when load failed");
});
