import React from "react";
import styles from "../styles/style.css";
// @ts-ignore

interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

function WordCard(word: WordResponse) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>{word.word}</div>
        <div className={styles.flipCardBack}>{word.meaning}</div>
      </div>
    </div>
  );
}

export default WordCard;
