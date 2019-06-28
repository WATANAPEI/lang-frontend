import React from "react";
import Header from "./Header.tsx";
import Body from "./Body.tsx";
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

