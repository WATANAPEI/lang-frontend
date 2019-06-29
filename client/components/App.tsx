import React from "react";
// @ts-ignore
import HeaderBar from "./HeaderBar.tsx";
// @ts-ignore
import Body from "./Body.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";

export class App extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <HeaderBar text="This is Header" />
        <Body text="This is Body" />
        <Footer text="This is footer" />
      </div>
    );
  }
}
