import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideBar: {
      color: "red",
      margin: "0 5px",
      height: "100%"
    },
    li: {
      listStyle: "none"
    }
  })
);

interface Props {
  text: string;
}

function SideBar({ text }: Props) {
  const classes = useStyles();
  return (
    <Paper className={classes.sideBar}>
      <MenuList className={classes.li}>
        <MenuItem>{text}1</MenuItem>
        <MenuItem>{text}2</MenuItem>
      </MenuList>
    </Paper>
  );
}

export default SideBar;
