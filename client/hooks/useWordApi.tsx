import React, { useState, useEffect } from "react";

interface WordResponse {
  word: string;
  meaning: string;
  wordLanguage: string;
  meaningLanguage: string;
}

interface ReturnData {
  wordResponse: WordResponse;
  isLoading: boolean;
  isError: boolean;
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
        const json: WordResponse = await response.json();
        setWord(json);
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
