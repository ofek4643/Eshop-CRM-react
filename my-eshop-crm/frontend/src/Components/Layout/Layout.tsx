import React from "react";
import Sidebar from "../NavBar/NavBar";
import Header from "../Header/Header";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
