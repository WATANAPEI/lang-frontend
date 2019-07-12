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

let mockWordResponse: WordResponse;
let mockResponse: Response;
let mockFailedResponse: Promise<{}>;
let mockSuccessFetch: MockFetch;
let mockFailedFetch: MockFetch;
let mockDoFetch: jest.Mock;
const mockNotFoundResponse: WordResponse = {
  id: -2,
  word: "Word Not Found",
  meaning: "Meaning Not Found",
  word_lang_id: -2,
  meaning_lang_id: -2
};

function MockReactComponent(mockUrlList: string[]) {
  let i = 0;
  const initialUrl = mockUrlList[i];
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
  console.log(`word: ${JSON.stringify(word)}`);
  return (
    <React.Fragment>
      <h1 id="id">{word.id}</h1>
      <h1 id="word">{word.word}</h1>
      <h1 id="meaning">{word.meaning}</h1>
      <h1 id="word_lang_id">{word.wordLanguageID}</h1>
      <h1 id="meaning_lang_id">{word.meaningLanguageID}</h1>
      <h1 id="isLoading">{isLoading}</h1>
      <h1 id="isError">{isError}</h1>
      <button
        id="doFetch"
        onClick={() => {
          i++;
          const mockUrl = mockUrlList[i];
//          console.log(`clicked: ${mockUrl}`);
          mockDoFetch = jest.fn(doFetch);
          mockDoFetch(mockUrl);
        }}
      />
    </React.Fragment>
  );
}

function mockFactory(
  condition: "success" | "failed",
  id: number,
  correctUrl: string
): MockFetch {
  if (condition === "success") {
    mockWordResponse = {
      id: `${100 + id}`,
      word: `sucess word ${id}`,
      meaning: `success meaning ${id}`,
      word_lang_id: `${10 + id}`,
      meaning_lang_id: `${20 + id}`
    };
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
          return await Promise.resolve({
            data: mockNotFoundResponse
          });
        };
      }
      console.log(`mockSuccessFetch was called`);
      return await Promise.resolve(mockResponse);
    };
    return mockSuccessFetch;
  } else {
    mockWordResponse = {
      data: {
        id: `${-100 - id}`,
        word: `sucess word ${-1 * id}`,
        meaning: `success meaning ${-1 * id}`,
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
          return await Promise.resolve({
            data: mockNotFoundResponse
          });
        };
      }
      return await Promise.resolve(mockResponse);
    };
    return mockFailedFetch;
  }
}

describe("test hooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns WordResponse and setUrl function", done => {
    const mockUrlList = [
      "http://dummy.com/1",
      "http://dummy.com/2"
    ];

//    const mockFetch = mockFactory("success", 1, mockUrlList[0]);
//    window.fetch = jest.fn(mockFetch);
    window.fetch = jest.fn().
      mockImplementationOnce(mockFactory("success", 1, mockUrlList[0])).
      mockImplementationOnce(mockFactory("success", 2, mockUrlList[1]));
    const fetchSpy = jest.spyOn(window, "fetch");
    act(() => {
      const wrapper = mount(<MockReactComponent {...mockUrlList} />);
      setImmediate(() => {
        wrapper.update();
        console.log(wrapper.debug());
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.find("#id").text()).toEqual(
          String(mockWordResponse.id)
        );
        expect(wrapper.find("#word").text()).toEqual(
          mockWordResponse.word
        );
        expect(wrapper.find("#meaning").text()).toEqual(
          mockWordResponse.meaning
        );
        expect(wrapper.find("#word_lang_id").text()).toEqual(
          String(mockWordResponse.word_lang_id)
        );
        expect(wrapper.find("#meaning_lang_id").text()).toEqual(
          String(mockWordResponse.meaning_lang_id)
        );
        wrapper.find("#doFetch").simulate("click");
        wrapper.update();
        expect(mockDoFetch).toHaveBeenCalledWith(mockUrlList[1]);
        wrapper.unmount();
        done();
      });
    });
  });
  it("accesses specified url and return response", () => {
  });
  it.todo("display loading text during loading");
  it.todo("display error message when load failed");
});
