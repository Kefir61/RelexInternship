import { Filter, ShopItem, Sort } from "@components";
import React from "react";
import { useSelector } from "react-redux";
import { selectShop } from "../../store/slices/shopSlice";
import "./Shop.scss";
import { useDispatch } from "react-redux";
import { setFilterColor, setFilterSize } from "../../store/slices/filterSlice";

export const Shop = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(selectShop);
  const handleFilterSize = (value: string) => {
    dispatch(setFilterSize(value));
  };
  const handleFilterColor = (value: string) => {
    dispatch(setFilterSize(value));
  };
  return (
    <div className="shop">
      <div className="shop--panel">
        <Filter handleFilterSize={handleFilterSize} handleFilterColor={handleFilterColor}/>
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
