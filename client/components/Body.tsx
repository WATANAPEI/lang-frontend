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
      margin: "100px auto",
      padding: "20px 0 20px"
    }
  })
);

function Body({ text }: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.textDisplay}>
      <CardContent>{text}</CardContent>
    </Card>
  );
}

export default Body;
