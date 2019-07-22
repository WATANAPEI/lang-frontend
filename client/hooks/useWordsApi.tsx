import React, { useState, useEffect } from "react";

export interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

export interface ReturnData {
  words: WordResponse[];
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
  data: RawData[];
}

interface UseWordsApi {
  (initialUrl: string, initialWord: WordResponse[]): [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ];
}

const useWordsApi: UseWordsApi = (initialUrl, initialWord) => {
  const [words, setWords] = useState(initialWord);
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
        const data: RawData[] = json.data;
        console.log(`data: ${JSON.stringify(data)}`);
        let words: WordResponse[] = [];
        for (const e of data) {
          words.push({
            id: e.id,
            word: e.word,
            meaning: e.meaning,
            wordLanguageID: e.word_lang_id,
            meaningLanguageID: e.meaning_lang_id
          });
        }
        console.log(`words: ${JSON.stringify(words)}`);
        setWords(words);
      } catch (error) {
        setIsError(true);
        console.log(`error: ${JSON.stringify(error)}`);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ words, isLoading, isError }, setUrl];
};

export default useWordsApi;
