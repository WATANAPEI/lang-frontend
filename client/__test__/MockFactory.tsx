// @ts-ignore
import MockFetch from "./useWordApi.spec.tsx";
// @ts-ignore
import { WordResponse } from "../hooks/useWordApi.tsx";

export interface MockWordFactory {
  (condition: "success" | "failed", id: number, correctUrl: string): [
    WordResponse,
    MockFetch
  ];
}

export interface MockWordsFactory {
  (condition: "success" | "failed", id: number, correctUrl: string): [
    WordResponse[],
    MockFetch
  ];
}
export interface MockFetch {
  (accessedUrl: string): Promise<Response>;
}

export const mockWordFactory: MockWordFactory = (condition, id, correctUrl) => {
  let mockWordResponse: WordResponse[];
  let mockResponse: Response;
  let mockFailedResponse: Promise<{}>;
  let mockSuccessFetch: MockFetch;
  let mockFailedFetch: MockFetch;
  const mockNotFoundResponse: WordResponse[] = [
    {
      id: -2,
      word: "Word Not Found",
      meaning: "Meaning Not Found",
      word_lang_id: -2,
      meaning_lang_id: -2
    }
  ];

  console.log(`mock ${id} is making`);
  if (condition === "success") {
    mockWordResponse = [
      {
        id: `${100 + id}`,
        word: `sucess word ${id}`,
        meaning: `success meaning ${id}`,
        word_lang_id: `${10 + id}`,
        meaning_lang_id: `${20 + id}`
      }
    ];
    console.log(`mock ${id} has mockWordResponse ${mockWordResponse[0].id}`);
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
    mockWordResponse = [
      {
        id: `${-100 - id}`,
        word: `failed word ${-1 * id}`,
        meaning: `failed meaning ${-1 * id}`,
        word_lang_id: `${-10 - id}`,
        meaning_lang_id: `${-20 - id}`
      }
    ];
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
};

export const mockWordsFactory: MockWordsFactory = (condition, id, correctUrl) => {
  let mockWordsResponse: WordResponse[] = [];
  let mockResponse: Response;
  let mockFailedResponse: Promise<{}>;
  let mockSuccessFetch: MockFetch;
  let mockFailedFetch: MockFetch;
  const mockNotFoundResponse: WordResponse[] = [
    {
      id: -2,
      word: "Word_Not_Found",
      meaning: "Meaning_Not_Found",
      word_lang_id: -2,
      meaning_lang_id: -2
    }
  ];

  //console.log(`mock ${id} is making`);
  if (condition === "success") {
    for(let i= 1; i<=10; i++){
      mockWordsResponse.push({
        id: `${100 * i + id}`,
        word: `sucess_word_${i}_${id}`,
        meaning: `success_meaning_${i}_${id}`,
        word_lang_id: `${10 * i + id}`,
        meaning_lang_id: `${20 * i + id}`
      });
    }
    //console.log(`mock ${id} has mockWordsResponse ${mockWordsResponse.id}`);
    mockSuccessFetch = async (accessedUrl: string) => {
      if (accessedUrl == correctUrl) {
        mockResponse = new Response();
        mockResponse.json = async () => {
          //console.log(`mockResponse succeed`);
          return await Promise.resolve({
            data: mockWordsResponse
          });
        };
      } else {
        mockResponse = new Response();
        mockResponse.json = async () => {
          //console.log(`mockResponse failed`);
          return await Promise.reject({
            data: mockNotFoundResponse
          });
        };
      }
      //console.log(`mockSuccessFetch was called`);
      return await Promise.resolve(mockResponse);
    };
    return [mockWordsResponse, mockSuccessFetch];
  } else {
    for( let i= 1; i <= 10; i++){
      mockWordsResponse.push({
        id: `${-100 * i - id}`,
        word: `failed_word_${i}_${id}`,
        meaning: `failed_meaning_${i}_${id}`,
        word_lang_id: `${-10 * i - id}`,
        meaning_lang_id: `${-20 * i - id}`
      });
    }
    mockFailedFetch = async (accessedUrl: string) => {
      if (accessedUrl == correctUrl) {
        mockResponse = new Response();
        mockResponse.json = async () => {
          return await Promise.resolve({
            data: mockWordsResponse
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
    return [mockWordsResponse, mockFailedFetch];
  }
};
