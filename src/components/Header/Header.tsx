import React, { FC, useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import "./Header.scss";
import { IUserInfo, PageRoutes, generateFio } from "@utils";
import { Link, useLocation } from "react-router-dom";
import { ProfileItems, MenuItems, PageHeader } from "@components";
import { AppDispatch, RootState } from "src/store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchBalance, selectBalance } from '../../store/slices/balanceSlice';

export const Header: FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const user = AppSelector<IUserInfo>(state => state.UserInfo.user);
  const dispatch = useDispatch<AppDispatch>();
  const {balance} = useSelector(selectBalance);

  useEffect(() => {
    setMenuOpen();
    dispatch(fetchBalance({}));
  }, [location]);

  const setMenuOpen = () =>{
    if(mobileMenuOpen){
      document.querySelector('body').classList.remove('menu-open')
    }else{
      document.querySelector('body').classList.add('menu-open')
    }
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  return (
    <>
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

        <div className="header__mobile-menu mobile-menu">
          <div
            className="mobile-menu__burger burger"
            onClick={setMenuOpen}
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
            <p className="profile-info__title">Баланс: {balance}</p>
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
            </div>
          </div>

          <Dropdown menu={{ items: ProfileItems }}>
            <a onClick={(e) => e.preventDefault()}>
              <div className="profile-info__user user">
                <div className="user__image">
                  <UserOutlined />
                </div>
                <span className="user__p dropdown__p">
                  {generateFio(user)}
                </span>
                <DownOutlined />
              </div>
            </a>
          </Dropdown>
        </div>
      </header>
      <PageHeader />
    </>
  );
};
