import React, { FC, useEffect, useState } from "react";
import {
  SearchOutlined,
  StarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Input, Dropdown } from "antd";
import "./Header.scss";
import { PageRoutes } from "@utils";
import { Link, useLocation } from "react-router-dom";
import { ProfileItems, MenuItems, menuLinks } from "@components";

export const Header: FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  function getHeaderInfoRight() {
    if (menuLinks[location.pathname] === "Магазин") {
      return (
        <div className="header__info__right__search">
          <Input placeholder="default size" prefix={<SearchOutlined />} />
        </div>
      );
    } else if (menuLinks[location.pathname] === "Избранное") {
      return (
        <div className="header__info__right__text">
          <h1 className="header__info__right__text__title">Избранное</h1>
          <StarOutlined className="header__info__right__text__icon" />
        </div>
      );
    } else {
      return (
        <div className="header__info__right__text">
          <h1 className="header__info__right__text__title">{menuLinks[location.pathname]}</h1>
        </div>
      );
    }
  }

  return (
    <header className="header">
      <nav className={mobileMenuOpen ? "header__menu open" : "header__menu"}>
        <Link
          className={mobileMenuOpen ? "header__menu__link open" : "header__menu__link"}
          to={PageRoutes.USERES_ORDERS}
        >
          Мои заказы
        </Link>
        <Link
          className={mobileMenuOpen ? "header__menu__link open" : "header__menu__link"}
          to={PageRoutes.THANKS}
        >
          Поблагодарить
        </Link>
        <Link
          className={mobileMenuOpen ? "header__menu__link open" : "header__menu__link"}
          to={PageRoutes.SHOP}
        >
          Магазин
        </Link>
        <Link
          className={mobileMenuOpen ? "header__menu__link open" : "header__menu__link"}
          to={PageRoutes.FAVOURITES}
        >
          Избранное
        </Link>
        <Dropdown
          menu={{ items: MenuItems }}
          className={mobileMenuOpen ? "header__menu__link open" : "header__menu__link"}
        >
          <a onClick={(e) => e.preventDefault()}>
            <span className="header__menu__link__p dropdown__p">Лента событий</span>
            <DownOutlined />
          </a>
        </Dropdown>
      </nav>

      <div className="header__info">
        <div className="header__info__right">{getHeaderInfoRight()}</div>

        <div className="header__info__left">
          <div className="header__info__left__mobile-menu">
            <div
              className="header__info__left__mobile-menu__burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                className={
                  mobileMenuOpen
                    ? "header__info__left__mobile-menu__burger__span open"
                    : "header__info__left__mobile-menu__burger__span"
                }
              ></span>
              <span
                className={
                  mobileMenuOpen
                    ? "header__info__left__mobile-menu__burger__span open"
                    : "header__info__left__mobile-menu__burger__span"
                }
              ></span>
              <span
                className={
                  mobileMenuOpen
                    ? "header__info__left__mobile-menu__burger__span open"
                    : "header__info__left__mobile-menu__burger__span"
                }
              ></span>
              <span
                className={
                  mobileMenuOpen
                    ? "header__info__left__mobile-menu__burger__span open"
                    : "header__info__left__mobile-menu__burger__span"
                }
              ></span>
            </div>
          </div>

          <div className="header__info__left__profile-info">
            <div className="header__info__left__profile-info__balance">
              <p className="header__info__left__profile-info__balance__title">Баланс: 23.00</p>
            </div>

            <div className="header__info__left__profile-info__shopping-cart">
              <Link
                className="header__info__left__profile-info__shopping-cart__link"
                to={PageRoutes.SHOPPING_CART}
              >
                <ShoppingCartOutlined className="header__info__left__profile-info__shopping-cart__link__icon" />
              </Link>
              <div className="header__info__left__profile-info__shopping-cart__section">
                <p className="header__info__left__profile-info__shopping-cart__section__quantity">
                  3
                </p>
                <p className="header__info__left__profile-info__shopping-cart__section__price">
                  17.00
                </p>
              </div>
            </div>

            <Dropdown menu={{ items: ProfileItems }}>
              <a onClick={(e) => e.preventDefault()}>
                <div className="header__info__left__profile-info__user">
                  <div className="header__info__left__profile-info__user__image">
                    <UserOutlined />
                  </div>
                  <span className="header__info__left__profile-info__user__p dropdown__p">
                    А.В. Петров
                  </span>
                  <DownOutlined />
                </div>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};
