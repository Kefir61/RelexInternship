import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { Header } from '@components'
import { getUser } from '../../store/slices/userSlice';
import { AppDispatch } from "src/store/store";
import { useDispatch } from "react-redux";

export const Layout: FC = () => {
  const navigate = useNavigate();
  const isAuthorized = !!localStorage.getItem("access_token");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, []);
  
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
