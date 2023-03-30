import { Filter, ShopItem, Sort } from "@components";
import React from "react";
import { useSelector } from "react-redux";
import { selectShop } from "../../store/slices/shopSlice";
import "./Shop.scss";

export const Shop = () => {
  const { list } = useSelector(selectShop);
  return (
    <div className="shop">
      <div className="shop--panel">
        <Filter />
        <Sort />
      </div>
      <div className="shop--items">
        {list.map((item) => (
          <ShopItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
