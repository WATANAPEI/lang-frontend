import React from "react";
// @ts-ignore
import HeaderBar from "./HeaderBar.tsx";
// @ts-ignore
import Main from "./Main.tsx";
// @ts-ignore
import SideBar from "./SideBar.tsx";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// @ts-ignore
import WordList from "./WordList.tsx";

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

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Grid container spacing={2} className={classes.headerBar}>
        <Grid item id="headerBar" xs={12}>
          <HeaderBar text="Lang Project" />
        </Grid>
        <Grid item id="sideBar" xs={3} className={classes.sideBar}>
          <SideBar />
        </Grid>
        <Grid item xs={9} className={classes.main}>
          <Route id="main" exact path="/lang/words/" component={Main} />
          <Route id="wordList" path="/lang/words/wordlist" component={WordList} />
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
