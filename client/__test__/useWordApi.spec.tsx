import React from "react";
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

interface MockFetch {
  (accessedUrl: string): Promise<Response>;
}

interface MockFactory {
  (condition: "success" | "failed", id: number, correctUrl: string): [
    WordResponse,
    MockFetch
  ];
}

let mockDoFetch: jest.Mock;

function MockReactComponent(mockUrlList: string[]) {
  let i = 0;
  const initialUrl = mockUrlList[i];
  console.log(`initialUrl: ${initialUrl}`);
  const [{ word, isLoading, isError }, doFetch]: [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ] = useWordApi(initialUrl, {
    id: -1,
    word: "Initialize error",
    meaning: "Initialize error",
    word_lang_id: -1,
    meaning_lang_id: -1
  });
  //console.log(`word: ${JSON.stringify(word)}`);
  return (
    <React.Fragment>
      <h1 id="id">{word.id}</h1>
      <h1 id="word">{word.word}</h1>
      <h1 id="meaning">{word.meaning}</h1>
      <h1 id="word_lang_id">{word.wordLanguageID}</h1>
      <h1 id="meaning_lang_id">{word.meaningLanguageID}</h1>
      <h1 id="isLoading">{String(isLoading)}</h1>
      <h1 id="isError">{String(isError)}</h1>
      <button
        id="doFetch"
        onClick={() => {
          i++;
          const mockUrl = mockUrlList[i];
          console.log(`clicked: ${mockUrl}`);
          mockDoFetch = jest.fn(doFetch);
          mockDoFetch(mockUrl);
        }}
      />
    </React.Fragment>
  );
}

const mockFactory: MockFactory = (condition, id, correctUrl) => {
  let mockWordResponse: WordResponse;
  let mockResponse: Response;
  let mockFailedResponse: Promise<{}>;
  let mockSuccessFetch: MockFetch;
  let mockFailedFetch: MockFetch;
  const mockNotFoundResponse: WordResponse = {
    id: -2,
    word: "Word Not Found",
    meaning: "Meaning Not Found",
    word_lang_id: -2,
    meaning_lang_id: -2
  };

  console.log(`mock ${id} is making`);
  if (condition === "success") {
    mockWordResponse = {
      id: `${100 + id}`,
      word: `sucess word ${id}`,
      meaning: `success meaning ${id}`,
      word_lang_id: `${10 + id}`,
      meaning_lang_id: `${20 + id}`
    };
    console.log(`mock ${id} has mockWordResponse ${mockWordResponse.id}`);
    mockSuccessFetch = async (accessedUrl: string) => {
      if (accessedUrl == correctUrl) {
        mockResponse = new Response();
        mockResponse.json = async () => {
          console.log(`mockResponse succeed`);
          return await Promise.resolve({
            data: mockWordResponse
          });
        };
      } else {
        mockResponse = new Response();
        mockResponse.json = async () => {
          console.log(`mockResponse failed`);
          return await Promise.reject({
            data: mockNotFoundResponse
          });
        };
      }
      console.log(`mockSuccessFetch was called`);
      return await Promise.resolve(mockResponse);
    };
    return [mockWordResponse, mockSuccessFetch];
  } else {
    mockWordResponse = {
      data: {
        id: `${-100 - id}`,
        word: `failed word ${-1 * id}`,
        meaning: `failed meaning ${-1 * id}`,
        word_lang_id: `${-10 - id}`,
        meaning_lang_id: `${-20 - id}`
      }
    };
    mockFailedFetch = async (accessedUrl: string) => {
      if (accessedUrl == correctUrl) {
        mockResponse = new Response();
        mockResponse.json = async () => {
          return await Promise.resolve({
            data: mockWordResponse
          });
        };
      } else {
        mockResponse = new Response();
        mockResponse.json = async () => {
          return await Promise.reject({
            data: mockNotFoundResponse
          });
        };
      }
      return await Promise.reject(mockResponse);
    };
    return [mockWordResponse, mockFailedFetch];
  }
}

function wordResponseCheck(word: WordResponse, wrapper: ReactWrapper) {
  expect(wrapper.find("#id").text()).toEqual(
    String(word.id)
  );
  expect(wrapper.find("#word").text()).toEqual(
    word.word
  );
  expect(wrapper.find("#meaning").text()).toEqual(
    word.meaning
  );
  expect(wrapper.find("#word_lang_id").text()).toEqual(
    String(word.word_lang_id)
  );
  expect(wrapper.find("#meaning_lang_id").text()).toEqual(
    String(word.meaning_lang_id)
  );
}

describe("test hooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns WordResponse and setUrl function and access specified url", done => {
    const mockUrlList = [
      "http://dummy.com/1",
      "http://dummy.com/2",
      "http://dummy.com/3"
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
      const wrapper = mount(<MockReactComponent {...mockUrlList} />);
      setImmediate(() => {
        wrapper.update();
        console.log(wrapper.debug());
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        wordResponseCheck(mockWordArray[0], wrapper);
        wrapper.find("#doFetch").simulate("click");
        wrapper.update();
        expect(mockDoFetch).toHaveBeenCalledWith(mockUrlList[1]);
        wrapper.unmount();
        done();
      });
    });
  });
  it("display loading text during loading", () => {
  
  });
  it("display error message when load failed", done => {
    const mockUrlList = [
      "http://dummy.com/1",
      "http://dummy.com/2",
      "http://dummy.com/3"
    ];
    let mockWordArray: WordResponse[] = [];
    let mockFetchArray: MockFetch[] = [];
    for (let i = 0; i < mockUrlList.length; i++) {
      [mockWordArray[i], mockFetchArray[i]] = mockFactory(
        "failed",
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
      const wrapper = mount(<MockReactComponent {...mockUrlList} />);
      setImmediate(() => {
        wrapper.update();
        console.log(wrapper.debug());
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.find("#isError").text()).toEqual("true");
        wrapper.unmount();
        done();
      });
    });
  });
});