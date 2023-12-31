import React from "react";
import { PageRoutes, logout } from "@utils";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

const logoutClick = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    await logout(refreshToken)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export const menuLinks = {
  [`/${PageRoutes.SHARED_FEED}`]: "Общая лента событий",
  [`/${PageRoutes.USERS_FEED}`]: "Личная лента событий",
  [`/${PageRoutes.SHOP}`]: "Магазин",
  [`/${PageRoutes.THANKS}`]: "Поблагодарить",
  [`/${PageRoutes.PROFILE}`]: "Профиль",
  [`${PageRoutes.SHOPPING_CART}`]: "Корзина",
  [`/${PageRoutes.FAVOURITES}`]: "Избранное",
  [`/${PageRoutes.USERES_ORDERS}`]: "Мои заказы",
  [`/${PageRoutes.FINANCE_HISTORY}`]: "История финансовых операций",
  [`${PageRoutes.CONFIRM_ORDER}`]: "Подтверждение заказа",
};

export const MenuItems: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to={PageRoutes.USERS_FEED}>Личная лента событий</Link>,
  },
  {
    key: "2",
    label: <Link to={PageRoutes.SHARED_FEED}>Общая лента событий</Link>,
  },
];

export const ProfileItems: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to={PageRoutes.PROFILE}>Профиль</Link>,
  },
  {
    key: "2",
    label: (
      <Link to={PageRoutes.LOGIN} onClick={logoutClick}>
        Выйти
      </Link>
    ),
  },
];
