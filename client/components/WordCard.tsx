import React, { useState, useEffect } from "react";
import styles from "../styles/style.css";
// @ts-ignore

export interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

function WordCard(word: WordResponse) {
  const [isFlipped, setIsFlipped] = useState(false);

//  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
//    if (!isFlipped) {
//      event.currentTarget.style.transform = "rotateY(180deg)";
//      setIsFlipped(true);
//    } else {
//      event.currentTarget.style.transform = "rotateY(0deg)";
//      setIsFlipped(false);
//    }
//  }
  useEffect(() => {
    const flipCardInner: HTMLElement | null = document.getElementById("flipCardInner");
    if (flipCardInner != null) {
//      console.log(`${styles.flipCardInner}`);
      if (isFlipped)
        flipCardInner.style.transform = "rotateY(180deg)";
      else
        flipCardInner.style.transform = "rotateY(0deg)";
    }
  });
  return (
    <div className={styles.flipCard}>
      <div id="flipCardInner" className={styles.flipCardInner} onClick={() => setIsFlipped(!isFlipped)}>
        <React.Fragment>
          <div className={styles.flipCardFront}>{word.word}</div>
          <div className={styles.flipCardBack}>{word.meaning}</div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default WordCard;
