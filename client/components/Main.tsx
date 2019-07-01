import React from "react";
// @ts-ignore
import WordCard from "./WordCard.tsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    div: {
      width: "100%",
      height: "300px"
    }
  })
);

function Main() {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <WordCard text="this is a word card." />
    </div>
  );
}

export default Main;
