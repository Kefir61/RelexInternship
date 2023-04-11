import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { FavoriteProduct, ListWithPagination } from "@components";
import React, { FC, useState } from "react";
import { appSelector } from "../../store/hooks";
import { ShopProductItem } from "../../store/slices/shopSlice";
import "./FavoriteGoodsStyle.scss";

export const FavoriteGoods: FC = () => {
  const GoodsList = appSelector<ShopProductItem[]>((state) => state.shop.list);

  const [sortBy, setSortBy] = useState<"ASC" | "DESC">("ASC");
  const handleChangeSort = () => {
    setSortBy((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  return (
    <div className="favoriteGoods">
      <div className="topButtons">
        <button className="deleteAllButton">Удалить всё из избранного</button>
        <div className="sortAndPagination">
          <div className="sortBlock">
            Сортировать по цене
            {sortBy === "ASC" ? (
              <SortAscendingOutlined onClick={() => handleChangeSort()} className="sortIcons" />
            ) : (
              <SortDescendingOutlined onClick={() => handleChangeSort()} className="sortIcons" />
            )}
          </div>
          <ListWithPagination
            content={[""]}
            onChangePage={() => {}}
            renderElement={() => <></>}
            totalPages={1}
          />
        </div>
      </div>
      {GoodsList.map((good) => (
        <FavoriteProduct item={good} />
      ))}
    </div>
  );
};
