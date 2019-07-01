import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideBar: {
      color: "red"

    }
  })
);

interface Props {
  text: string;
}

function SideBar({ text }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.sideBar}>
      <h4>{text}</h4>
    </div>
  );
}

export default SideBar;
