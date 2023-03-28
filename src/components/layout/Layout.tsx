import React, {FC} from "react";
import { Navigate, Outlet } from "react-router";
import { Header, Footer} from '@components'

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer/>
    </> 
  )
}
