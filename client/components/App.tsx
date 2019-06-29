import React from "react";
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import Body from "./Body.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";

export class App extends React.Component<any, any> {
  render() {
    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
  }
}

