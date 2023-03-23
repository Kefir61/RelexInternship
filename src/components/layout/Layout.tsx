import React, {FC} from "react";
import { Navigate, Outlet } from "react-router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const Layout: FC = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </> 
  )
}
