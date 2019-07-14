import React, { useState } from "react";
// @ts-ignore
import WordCard from "./WordCard.tsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
// @ts-ignore
import useWordApi from "../hooks/useWordApi.tsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      width: "100%",
      height: "100%",
      alignItems: "center"
    },
    navCard: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    wordCardGrid: {
      width: "100%",
      height: "100%"
    }
  })
);

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

function Main() {
  const classes = useStyles();
  const [id, setId] = useState(1);
  const [{ word, isLoading, isError }, doFetch]: [
    ReturnData,
    React.Dispatch<React.SetStateAction<string>>
  ] = useWordApi("http://localhost:3000/words/1", {
    id: -1,
    word: "Initialize error",
    meaning: "Initialize error",
    wordLanguageID: -1,
    meaningLanguageID: -1
  });
  return (
    <Grid container spacing={2} className={classes.mainContainer}>
      <Grid item xs={1} className={classes.navCard}>
        <Button
          id="prevButton"
          data-prev={id}
          onClick={() => {
            if (id > 1) {
              const prevId = id - 1;
              setId(prevId);
              console.log(`id: ${id}`);
              console.log(`prevId: ${prevId}`);
              doFetch(`http://localhost:3000/words/${encodeURIComponent(String(prevId))}`);
            }
          }}
        >
          <ArrowBackIcon />
        </Button>
      </Grid>
      <Grid item xs={10} id="mainGrid" className={classes.wordCardGrid}>
        {isError && <div id="loadingErrorMessage">Something went wrong ...</div>}
        {isLoading ? <div id="loadingMessage">Loading...</div> : <WordCard {...word} />}
      </Grid>
      <Grid item xs={1} className={classes.navCard}>
        <Button
          id="nextButton"
          data-next={id}
          onClick={() => {
            const nextId = id + 1;
            setId(nextId);
            console.log(`id: ${id}`);
            console.log(`nextId: ${nextId}`);
            doFetch(`http://localhost:3000/words/${encodeURIComponent(String(nextId))}`);
          }}
        >
          <ArrowForwardIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Main;
