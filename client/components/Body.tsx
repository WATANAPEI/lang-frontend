import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface Props {
  text: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textDisplay: {
      maxWidth: 800,
      maxHeight: 500,
      margin: "50px auto",
//      padding: "20px 0 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
    },
    wordDisplay: {
      maxWidth: 600,
      maxHeight: 200,
      height: "40%"
//      margin: "0 auto",
//      padding: "50px 50px"
    }
  })
);

function Body({ text }: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.textDisplay}>
      <CardContent className={classes.wordDisplay}>{text}</CardContent>
      <CardContent className={classes.wordDisplay}>{text}</CardContent>
    </Card>
  );
}

export default Body;
