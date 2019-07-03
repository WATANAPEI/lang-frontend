import React, { useState, useEffect} from "react";

interface WordResponse {
  word: string;
  meaning: string;
  wordLanguage: string;
  meaningLanguage: string;
}

interface UseWordApi {
  data: {
    wordResponse: wordResponse;
    isLoading: boolean;
    isError: boolean;
  };
  setUrl: (string) => void;
}


const useWordApi = (initialUrl: string, initialWord: WordResponse): UseWordApi => {
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
        setWord(response.body);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ word, isLoading, isError }, setUrl];
};

export default useWordApi;
