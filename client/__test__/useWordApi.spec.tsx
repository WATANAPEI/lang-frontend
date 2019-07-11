import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, mount, ReactWrapper } from "enzyme";
// @ts-ignore
import useWordApi, { WordResponse, ReturnData } from "../hooks/useWordApi.tsx";

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
let mockSuccessResponse: Promise<Response>;
let mockFailedResponse: Promise<{}>;

describe("test hooks", () => {
  beforeEach(() => {
    mockWordSuccessResponse = {
      id: 100,
      word: "sucess word",
      meaning: "success meaning",
      wordLanguageID: 1,
      meaningLanguageID: 2
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
    mockSuccessResponse = Promise.resolve(mockSuccessJsonPromise);
    mockFailedResponse = Promise.resolve(mockFailedJsonPromise);
    //mockSuccessResponse = new Response(myBlob);
    //mockFailedResponse = new Response(myBlob);
//      new Blob(JSON.stringify({ json: () => mockFailedJsonPromise }))
//    );

//    mockSuccessResponse = { json: () => mockSuccessJsonPromise };
//    mockFailedResponse = { json: () => mockFailedResponse };
    mockFetchPromise = (status: "success" | "fail") => {
      return new Promise((resolve, reject) => {
        if (status === "success") {
          resolve(mockSuccessResponse);
        } else {
          reject(mockFailedResponse);
        }
      });
    };

    });

  it("returns WordResponse and setUrl function", () => {
    //console.log(MockReactComponent);
    window.fetch = jest
      .fn()
      .mockImplementation(() => mockFetchPromise("success"));
    const spy = jest.spyOn(window, "fetch");
    function MockReactComponent() {
      const [{ word, isLoading, isError }, doFetch]: [
        ReturnData,
        React.Dispatch<React.SetStateAction<string>>
      ] = useWordApi("http://localhost:3000/words/1", {
        id: 1,
        word: "aa",
        meaning: "bb",
        wordLanguageID: 1,
        meaningLanguageID: 2
      });
      return (<React.Fragment>{word.id}</React.Fragment>);
    }
    let wrapper!: ReactWrapper;
    act(() => {
      wrapper = mount(<MockReactComponent />);
    });
    return Promise.
      resolve(wrapper).then(() => {
      //  wrapper.update();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  it.todo("accesses specified url and return response");
  it.todo("display loading text during loading");
  it.todo("display error message when load failed");
});
