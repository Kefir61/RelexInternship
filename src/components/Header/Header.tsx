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

  // function getHeaderInfoRight() {
  //   if (menuLinks[location.pathname] === "Магазин") {
  //     return (
  //       <div className="info__search">
  //         <Input placeholder="default size" prefix={<SearchOutlined />} />
  //       </div>
  //     );
  //   } else if (menuLinks[location.pathname] === "Избранное") {
  //     return (
  //       <div className="header__info__right__text">
  //         <h1 className="header__info__right__text__title">Избранное</h1>
  //         <StarOutlined className="header__info__right__text__icon" />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="header__info__right__text">
  //         <h1 className="header__info__right__text__title">{menuLinks[location.pathname]}</h1>
  //       </div>
  //     );
  //   }
  // }

  return (
    <header className="header">
      <nav className={mobileMenuOpen ? "header__menu menu open" : "header__menu menu"}>
        <Link
          className={mobileMenuOpen ? "menu__link open" : "menu__link"}
          to={PageRoutes.USERES_ORDERS}
        >
          Мои заказы
        </Link>
        <Link
          className={mobileMenuOpen ? "menu__link open" : "menu__link"}
          to={PageRoutes.THANKS}
        >
          Поблагодарить
        </Link>
        <Link
          className={mobileMenuOpen ? "menu__link open" : "menu__link"}
          to={PageRoutes.SHOP}
        >
          Магазин
        </Link>
        <Link
          className={mobileMenuOpen ? "menu__link open" : "menu__link"}
          to={PageRoutes.FAVOURITES}
        >
          Избранное
        </Link>
        <Dropdown
          menu={{ items: MenuItems }}
          className={mobileMenuOpen ? "menu__link open" : "menu__link"}
        >
          <a onClick={(e) => e.preventDefault()}>
            <span className="menu__p dropdown__p">Лента событий</span>
            <DownOutlined />
          </a>
        </Dropdown>
      </nav>

      {/* <div className="header__info info"> */}
        {/* <div className="info__right">{getHeaderInfoRight()}</div> */}

        {/* <div className="header__info__left"> */}
          <div className="header__mobile-menu mobile-menu">
            <div
              className="mobile-menu__burger burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                className={
                  mobileMenuOpen
                    ? "burge__span open"
                    : "burger__span"
                }
              ></span>
              <span
                className={
                  mobileMenuOpen
                    ? "burger__span open"
                    : "burger__span"
                }
              ></span>
              <span
                className={
                  mobileMenuOpen
                    ? "burger__span open"
                    : "burger__span"
                }
              ></span>
              <span
                className={
                  mobileMenuOpen
                    ? "burger__span open"
                    : "burger__span"
                }
              ></span>
            </div>
          </div>

          <div className="header__profile-info profile-info">
            <div className="profile-info__balance">
              <p className="profile-info__title">Баланс: 123.00</p>
            </div>

            <div className="profile-info__shopping-cart shopping-cart">
              <Link
                className="shopping-cart__link"
                to={PageRoutes.SHOPPING_CART}
              >
                <ShoppingCartOutlined className="shopping-cart__icon" />
              </Link>
              <div className="shopping-cart__section">
                <p className="shopping-cart__quantity">
                  30
                </p>
                <p className="shopping-cart__price">
                  117.00
                </p>
              </div>
            </div>

            <Dropdown menu={{ items: ProfileItems }}>
              <a onClick={(e) => e.preventDefault()}>
                <div className="profile-info__user user">
                  <div className="user__image">
                    <UserOutlined />
                  </div>
                  <span className="user__p dropdown__p">
                    А.В. Петроветров
                  </span>
                  <DownOutlined />
                </div>
              </a>
            </Dropdown>
          </div>
        {/* </div> */}
      {/* </div> */}
    </header>
  );
};
