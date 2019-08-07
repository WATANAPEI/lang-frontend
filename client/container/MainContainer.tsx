import React, { useState } from "react";
// @ts-ignore
import useWordApi from "../hooks/useWordApi.tsx";
// @ts-ignore
import MainComponent, { MainComponentProps } from "../components/MainComponent.tsx";

interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

interface ReturnData {
  word: WordResponse;
  isLoading: boolean;
  isError: boolean;
}

function MainContainer() {
  let backendUrl: string;
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === "production") {
    backendUrl = "https://wpei.dev/lang/api/v1/words/";
  } else {
    backendUrl = "http://127.0.0.1:3000/words/";
  }
  const [id, setId] = useState(1);
  const [{ word, isLoading, isError }, doFetch]: [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ] = useWordApi(backendUrl + "1", {
    id: -1,
    word: "Initialize error",
    meaning: "Initialize error",
    wordLanguageID: -1,
    meaningLanguageID: -1
  });
  const prev = (): void => {
    if (id > 1) {
      const prevId = id - 1;
      setId(prevId);
      console.log(`id: ${id}`);
      console.log(`prevId: ${prevId}`);
      doFetch(`${backendUrl}${encodeURIComponent(String(prevId))}`);
    } else {
    }
  };
  const next = (): void => {
    const nextId = id + 1;
    setId(nextId);
    console.log(`id: ${id}`);
    console.log(`nextId: ${nextId}`);
    doFetch(`${backendUrl}${encodeURIComponent(String(nextId))}`);
  };
  const props = {
    wordFront: word.word,
    wordBack: word.meaning
  };
  const mainComponentProps: MainComponentProps = {
    wordCardProps: props,
    isLoading: isLoading,
    isError: isError,
    next: next,
    prev: prev
  };
  return <MainComponent {...mainComponentProps} />;
}

export default MainContainer;
