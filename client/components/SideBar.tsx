import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

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
        <MenuItem>
          <NavLink to="/lang/words/">
            {text}1
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/lang/words/wordlist">
            {text}2
          </NavLink>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default SideBar;
