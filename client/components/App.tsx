import React from "react";
// @ts-ignore
import HeaderBar from "./HeaderBar.tsx";
// @ts-ignore
import Main from "./Main.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";
// @ts-ignore
import SideBar from "./SideBar.tsx";

export class App extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <HeaderBar text="This is Header" />
        <Main />
        <SideBar text="this is sidebar" />
        <Footer text="This is footer" />
      </div>
    );
  }
}
