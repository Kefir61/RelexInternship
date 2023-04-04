import { SearchOutlined, StarOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { FC } from "react";
import { useLocation } from "react-router";
import {menuLinks } from "@components";
import './PageHeader.scss'

export const PageHeader: FC = () => {
    const location = useLocation();
 
    const getHeaderInfoRight = () => {
      if (menuLinks[location.pathname] === "Магазин") {
        return (
          <div className="page-header__search">
            <Input placeholder="Введите название товара" prefix={<SearchOutlined />} />
          </div>
        );
      } 
      
      if (menuLinks[location.pathname] === "Избранное") {
        return (
          <div className="page-header__text">
            <h1 className="page-header__title">Избранное</h1>
            <StarOutlined className="page-header__icon" />
          </div>
        );
      } 
        
      return (
          <div className="page-header__text">
            <h1 className="page-header__title">{menuLinks[location.pathname]}</h1>
          </div>
        );
    }
  
    return (
        <header className="page-header">
            {getHeaderInfoRight()}
        </header>
    )
}