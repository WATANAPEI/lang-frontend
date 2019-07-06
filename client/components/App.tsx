import React from "react";
// @ts-ignore
import HeaderBar from "./HeaderBar.tsx";
// @ts-ignore
import Main from "./Main.tsx";
// @ts-ignore
import SideBar from "./SideBar.tsx";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerBar: {
      height: "20vh"
    },
    sideBar: {
      height: "80vh"
    },
    main: {
      height: "80vh"
    }
  })
);

export function App() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.headerBar}>
      <Grid item xs={12}>
        <HeaderBar text="Lang Project" />
      </Grid>
      <Grid item xs={3} className={classes.sideBar}>
        <SideBar text="sidebar" />
      </Grid>
      <Grid item xs={9} className={classes.main}>
        <Main />
      </Grid>
    </Grid>
  );
}
