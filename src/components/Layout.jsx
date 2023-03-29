import React, { Children } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col  ">
      <div className="flex flex-1 overflow-y-auto ">
        <Sidebar />
        <main className="flex-1 ">{children}</main>
      </div>
      <footer className="h-20 ">this is a player components</footer>
    </div>
  );
}
