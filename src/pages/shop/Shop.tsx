import { Filter, ListWithPagination, ShopItem, Sort } from "@components";
import React from "react";
import { useSelector } from "react-redux";
import { selectShop } from "../../store/slices/shopSlice";
import "./Shop.scss";
import { useDispatch } from "react-redux";
import { setFilterColor, setFilterSize, setPage } from "../../store/slices/filterSlice";

export const Shop = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(selectShop);
  const handleFilterSize = (value: string) => {
    dispatch(setFilterSize(value));
  };
  const handleFilterColor = (value: string) => {
    dispatch(setFilterColor(value));
  };
  const onChangePage = () => {
    dispatch(setPage())
  }
  return (
    <div className="shop">
      <div className="shop--panel">
        <div className="shop--panel__filters">
          <Filter
            handleFilterSize={handleFilterSize}
            handleFilterColor={handleFilterColor}
          />
        </div>
        <div className="shop--panel__sort">
          <Sort />
          <ListWithPagination
            totalElementCount={8}
            renderElement={({}) => <div></div>}
            content={[{}]}
            onChangePage={onChangePage}
          />
        </div>
      </div>
      <div className="shop--items">
        {list.map((item) => (
          <ShopItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
