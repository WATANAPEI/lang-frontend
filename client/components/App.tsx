import React from "react";
// @ts-ignore
import HeaderBar from "./HeaderBar.tsx";
// @ts-ignore
import Main from "./Main.tsx";
// @ts-ignore
import SideBar from "./SideBar.tsx";
import Grid from "@material-ui/core/Grid";

export function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeaderBar text="This is a Header" />
      </Grid>
      <Grid item xs={3}>
        <SideBar text="sidebar" />
      </Grid>
      <Grid item xs={9}>
        <Main />
      </Grid>
    </Grid>
  );
}
