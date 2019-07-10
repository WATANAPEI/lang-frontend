import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
// @ts-ignore
import useWordApi, { WordResponse, ReturnData } from "../hooks/useWordApi.tsx";

interface UseWordApi {
  (initialUrl: string, initialWord: WordResponse): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

describe("test hooks", () => {
  let mockSuccessResponse: WordResponse;
  let mockFailedResponse;
  let mockSuccessJsonPromise: Promise<WordResponse>;
  let mockFailedJsonPromise: Promise<{}>;
  let mockFetchPromise;
  let mockReactComponent: (hook: UseWordApi) => JSX.Element;

  beforeEach(() => {
    mockSuccessResponse = {
      id: 100,
      word: "sucess word",
      meaning: "success meaning",
      wordLanguageID: 1,
      meaningLanguageID: 2
    };
    mockFailedResponse = {};
    mockSuccessJsonPromise = Promise.resolve(mockSuccessResponse);
    mockFailedJsonPromise = Promise.resolve(mockFailedResponse);
    mockFetchPromise = (status: "success" | "fail") => {
      return new Promise((resolve, reject) => {
        if (status === "success") {
          resolve({ json: () => mockSuccessJsonPromise });
        } else {
          reject({ json: () => mockFailedJsonPromise });
        }
      });
    };

    mockReactComponent = (hook: UseWordApi) => {
      return <div {...hook} />;
    };
  });

  it("returns WordResponse and setUrl function", () => {
    //console.log(mockReactComponent);
    
  });
  it.todo("accesses specified url and return response");
  it.todo("display loading text during loading");
  it.todo("display error message when load failed");

});

