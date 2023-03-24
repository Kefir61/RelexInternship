import React, {FC} from "react";
import { Navigate, Outlet } from "react-router";

import { Footer } from "../Footer/Footer";
import { Header } from "../header/Header";

export const Layout: FC = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </> 
  )
}
