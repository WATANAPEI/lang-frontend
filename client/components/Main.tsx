import React from "react";
// @ts-ignore
import WordCard from "./WordCard.tsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      width: "100%",
      height: "100%",
      spacing: "2",
      justifyContent: "stretch",
      alignItems: "center"
    },
    navCard: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    wordCardGrid: {
    }
  })
);

function Main() {
  const classes = useStyles();
  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={1} className={classes.navCard}>
        <Card>
          <CardContent>left</CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} className={classes.wordCardGrid}>
        <WordCard text="this is a word card." />
      </Grid>
      <Grid item xs={1} className={classes.navCard}>
        <Card>
          <CardContent>right</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Main;
