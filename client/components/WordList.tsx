import React from "react";

function WordList() {
  const fetchWordList = [
    {
      id: 1,
      word: "word1",
      meaning: "meaning1"
    },
    {
      id: 2,
      word: "word2",
      meaning: "meaning2"
    },
    {
      id: 3,
      word: "word3",
      meaning: "meaning3"
    }
  ];

  const wordListItems = fetchWordList.map(word =>
    <li key={word.id.toString()}>
      {word.word} | {word.meaning}
    </li>
  );

  return <ul>{wordListItems}</ul>;
}

export default WordList;
