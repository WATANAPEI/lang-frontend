import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "../styles/style.css";

interface Props {
  text: string;
}

function WordCard({ text }: Props) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>{`${text}1`}</div>
        <div className={styles.flipCardBack}>{`${text}2`}</div>
      </div>
    </div>
  );
}

export default WordCard;
