import React, { useState } from "react";
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
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className={styles.flipCard}>
      <div
        className={styles.flipCardInner}
        onClick={(event: React.MouseEvent<HTMLInputElement>): void => {
          if (!isFlipped) {
            event.currentTarget.style.transform = "rotateY(180deg)";
            setIsFlipped(true);
          } else {
            event.currentTarget.style.transform = "rotateY(0deg)";
            setIsFlipped(false);
          }
        }}
      >
        <div className={styles.flipCardFront}>{word.word}</div>
        <div className={styles.flipCardBack}>{word.meaning}</div>
      </div>
    </div>
  );
}

export default WordCard;
