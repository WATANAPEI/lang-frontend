import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface Props {
  text: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordCard: {
//      margin: "50px auto",
//      padding: "20px 0 20px",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    wordCardContent: {
//      maxWidth: 600,
//      maxHeight: 200,
//      height: "40%"
//      margin: "0 auto",
//      padding: "50px 50px"
//      height: "75%",
//      width: "75%",
      fontSize: "40px"
    }
  })
);

function WordCard({ text }: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.wordCard}>
      <CardContent className={classes.wordCardContent}>{text}</CardContent>
    </Card>
  );
}

export default WordCard;
