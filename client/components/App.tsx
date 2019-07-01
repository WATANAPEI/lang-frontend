import React from "react";
// @ts-ignore
import HeaderBar from "./HeaderBar.tsx";
// @ts-ignore
import Main from "./Main.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";
// @ts-ignore
import SideBar from "./SideBar.tsx";

export function App() {
  return (
    <div>
      <HeaderBar text="This is a Header" />
      <Main />
      <SideBar text="this is sidebar" />
      <Footer text="This is footer" />
    </div>
  );
}
