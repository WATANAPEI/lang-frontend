import React, { useState, useEffect } from "react";

export interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

export interface ReturnData {
  word: WordResponse;
  isLoading: boolean;
  isError: boolean;
}

interface RawData {
  id: number;
  word: string;
  meaning: string;
  word_lang_id: number;
  meaning_lang_id: number;
  created_by: string;
  last_updated_by: string;
  created_at: string;
  updated_at: string;
}

interface ReturnJson {
  status: string;
  message: string;
  data: RawData;
}

interface UseWordApi {
  (initialUrl: string, initialWord: WordResponse): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

const useWordApi: UseWordApi = (initialUrl, initialWord) => {
  const [word, setWord] = useState(initialWord);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(url);
        console.log(`reponse: ${JSON.stringify(response)}`);
        const json: ReturnJson = await response.json();
        console.log(`json: ${JSON.stringify(json)}`);
        const data: RawData = json.data;
        console.log(`data: ${JSON.stringify(data)}`);
        const word: WordResponse =
        {
          id: data.id,
          word: data.word,
          meaning: data.meaning,
          wordLanguageID: data.word_lang_id,
          meaningLanguageID: data.meaning_lang_id
        };
//      console.log(`json: ${JSON.stringify(word)}`);
//      console.log(`data: ${data}`);
//      console.log(`word: ${word}`);
        setWord(word);
      } catch (error) {
        setIsError(true);
        console.log(`error: ${JSON.stringify(error)}`);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ word, isLoading, isError }, setUrl];
};

export default useWordApi;
