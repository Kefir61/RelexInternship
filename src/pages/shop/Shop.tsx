import { Filter, ListWithPagination, ShopItem, Sort } from "@components";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts, selectShop } from "../../store/slices/shopSlice";
import "./Shop.scss";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/slices/shopFilterSlice";
import { ShopProductItem } from "src/store/slices/shopSlice";
import { Spin } from "antd";

export const Shop = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector(selectShop);
  const getMenu = async () => {
    //@ts-ignore
    dispatch(
      //@ts-ignore
      fetchProducts({
        // currentPage: 10,
        // pageSize: 10,
        // totalPages: 1,
        // descending: false,
        // color: null,
        // size: null,
        // filter: null,
      })
    );
  };

  useEffect(() => {
    getMenu();
  }, []);
  const handleFilterSize = (value: string) => {
    dispatch(setFilterSize(value));
  };
  const handleFilterColor = (value: string) => {
    dispatch(setFilterColor(value));
  };
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
          <ListWithPagination
            totalPages={8}
            renderElement={({}) => <></>}
            content={[{}]}
            onChangePage={onChangePage}
          />
        </div>
      </div>
      <div className="shop--items">
        {status === "LOADING"
          ? [...new Array(8)].map((_, index) => (
              <Spin size="large" className="shop--items__loading" />
            ))
          : list.map((item: ShopProductItem) => (
              <ShopItem key={item.id} {...item} />
            ))}
      </div>
    </div>
  );
};
