import { Filter, ShopItem, Sort } from "@components";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchProducts,
  selectShop,
  setPage,
} from "../../store/slices/shopSlice";
import "./Shop.scss";
import { useDispatch } from "react-redux";
import { selectFilter } from "../../store/slices/shopFilterSlice";
import { ShopProductItem } from "src/store/slices/shopSlice";
import { Spin } from "antd";
import { Pagination } from "antd";
import { AppDispatch } from "src/store/store";

export const Shop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, currentPage, totalPages, totalElements, pageSize } =
    useSelector(selectShop);
  const { filterSize, filterColor, sort } = useSelector(selectFilter);

  const getMenu = async () => {
    dispatch(
      fetchProducts({
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        order: sort,
        color: filterColor,
        size: filterSize,
      })
    );
  };

  useEffect(() => {
    getMenu();
  }, [filterSize, filterColor, sort, currentPage]);

  const onChangePage = (value: number) => {
    dispatch(setPage(value));
  };

  return (
    <div className="shop">
      <div className="shop--panel">
        <div className="shop--panel__filters">
          <Filter />
        </div>
        <div className="shop--panel__sort">
          <Sort />
          <Pagination
            size="small"
            pageSize={pageSize}
            defaultCurrent={1}
            total={totalElements}
            onChange={onChangePage}
            showSizeChanger={false}
            current={currentPage}
          />
        </div>
      </div>
      <div className="shop--items">
        {status === "LOADING" ? (
          <Spin size="large" className="shop--items__loading" />
        ) : (
          list.map((item: ShopProductItem) => (
            <ShopItem key={item.id} {...item} />
          ))
        )}
      </div>
    </div>
  );
};
