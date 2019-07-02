import React from "react";
// @ts-ignore
import WordCard from "./WordCard.tsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button"

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
  return (
    <Grid container spacing={2} className={classes.mainContainer}>
      <Grid item xs={1} className={classes.navCard}>
        <Button>
          <ArrowBackIcon />
        </Button>
      </Grid>
      <Grid item xs={10} className={classes.wordCardGrid}>
        <WordCard text="this is a word card." />
      </Grid>
      <Grid item xs={1} className={classes.navCard}>
        <Button>
          <ArrowForwardIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Main;
