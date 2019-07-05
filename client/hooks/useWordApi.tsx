import React, { useState, useEffect } from "react";

interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

interface ReturnData {
  wordResponse: WordResponse;
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

const useWordApi = (
  initialUrl: string,
  initialWord: WordResponse
): [ReturnData, React.Dispatch<React.SetStateAction<string>>] => {
  const [wordResponse, setWord] = useState(initialWord);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const json: ReturnJson = await response.json();
        const data: RawData = json.data;
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
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ wordResponse, isLoading, isError }, setUrl];
};

export default useWordApi;
