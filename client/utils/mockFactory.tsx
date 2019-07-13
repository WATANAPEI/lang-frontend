// @ts-ignore
import MockFetch from "./useWordApi.spec.tsx";
// @ts-ignore
import { WordResponse } from "../hooks/useWordApi.tsx";
export interface MockFactory {
  (condition: "success" | "failed", id: number, correctUrl: string): [
    WordResponse,
    MockFetch
  ];
}

export interface MockFetch {
  (accessedUrl: string): Promise<Response>;
}

export const mockFactory: MockFactory = (condition, id, correctUrl) => {
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
