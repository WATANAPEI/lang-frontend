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

function Main() {
  const classes = useStyles();
  const [id, setId] = useState(1);
  const [{ wordResponse, isLoading, isError }, doFetch] = useWordApi(
    "http://localhost:3000/words/1",
    {
      id: 1,
      word: "aa",
      meaning: "bb",
      wordLanguageID: 1,
      meaningLanguageID: 2
    }
  );
  return (
    <Grid container spacing={2} className={classes.mainContainer}>
      <Grid item xs={1} className={classes.navCard}>
        <Button
          onClick={() => {
            if (id > 1) {
              setId(id - 1);
              doFetch(`http://localhost:3000/words/${id}`);
            }
          }
       } >
          <ArrowBackIcon />
        </Button>
      </Grid>
      <Grid item xs={10} className={classes.wordCardGrid}>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <WordCard text={wordResponse.word} />
        )}
      </Grid>
      <Grid item xs={1} className={classes.navCard}>
        <Button
          onClick={() => {
            setId(id + 1);
            doFetch(`http://localhost:3000/words/${id}`);
          }
       } >
          <ArrowForwardIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Main;
