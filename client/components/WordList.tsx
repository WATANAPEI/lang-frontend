import React from "react";
// @ts-ignore
import useWordsApi from "../hooks/useWordsApi.tsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordList: {
      color: "red",
      listStyle: "none"
    },
    wordListContainer: {
      display: "flex",
//      flexDirection: "column",
      flexWrap: "wrap",
//      justifyContent: "space-around",
      overflow: "auto",
      height: "100%",
//      width: "100%"
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
//      maxWidth: 300
    }
  })
);

function WordList() {
  let backendUrl: string;
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === "production") {
    backendUrl = "https://wpei.dev/lang/api/v1/words";
  } else {
    backendUrl = "http://127.0.0.1:3000/words";
  }
  const [{ words, isLoading, isError }, doFetch] = useWordsApi(
    backendUrl,
    [{
      id: -1,
      word: "initialize_error",
      meaning: "initialize_error",
      wordLanguageID: -1,
      meaningLanguageID: -1
    }
  ]);
  const classes = useStyles();

  const wordListItems = words.map((word: WordResponse) =>
    <li key={word.id.toString()} className={classes.wordList}>
      {word.id} | {word.word} | {word.meaning}
    </li>
  );
  
  const wordLists = words.map((word: WordResponse) =>
    <Paper key={word.id.toString()} className={classes.paper}>
      <Grid container direction="row" spacing={2}>
        <Grid item>
          <h1>{word.id}</h1>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <h3>{word.word}</h3>
              <h3>{word.meaning}</h3>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <div className={classes.wordListContainer}>
      {wordLists}
    </div>
  );
}

export default WordList;
