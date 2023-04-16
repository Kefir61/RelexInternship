import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { FavoriteProduct, ListWithPagination, Loader } from "@components";
import React, { FC, useCallback, useEffect, useState } from "react";
import { appSelector } from "../../store/hooks";
import { ShopProductItem } from "../../store/slices/shopSlice";
import "./FavoriteGoodsStyle.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteAll, getFavorites } from "../../store/slices/favoritesSlice";

export const FavoriteGoods: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const GoodsList = appSelector<ShopProductItem[]>((state) => state.favorites.contents);
  const totalPages = appSelector<number>((state) => state.favorites.totalPages);
  const loading = appSelector<boolean>((state) => state.favorites.loading);
  const error = appSelector<string>((state) => state.favorites.error);
  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState<"ASC" | "DESC">("ASC");
  const handleChangeSort = () => {
    setPage(1);
    setSortBy((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  useEffect(() => {
    dispatch(
      getFavorites({
        currentPage: 0,
        pageSize: 10,
        price: sortBy,
      })
    );
  }, [sortBy]);

  const onChangeThanksPage = useCallback(
    (pageNum: number) => {
      setPage(pageNum);
      dispatch(
        getFavorites({
          currentPage: pageNum - 1,
          pageSize: 10,
          price: sortBy,
        })
      );
    },
    [sortBy]
  );

  const handleDeleteFav = () => {
    dispatch(deleteAll());
  };

  return (
    <div className="favoriteGoods">
      <div className="topButtons">
        <button className="deleteAllButton" onClick={handleDeleteFav}>
          Удалить всё из избранного
        </button>
        <div className="sortBlock">
          <div>Сортировать по цене</div>
          {sortBy === "ASC" ? (
            <SortAscendingOutlined onClick={() => handleChangeSort()} className="sortIcons" />
          ) : (
            <SortDescendingOutlined onClick={() => handleChangeSort()} className="sortIcons" />
          )}
        </div>
      </div>
      {error && <div>Что-то пошло не так. Попробуйте еще раз</div>}
      {loading && <Loader />}
      {!GoodsList.length && !error && !loading && <p>Нет избранных товаров</p>}
      {!!GoodsList.length && !error && !loading && (
        <ListWithPagination
          content={GoodsList}
          onChangePage={onChangeThanksPage}
          renderElement={(product: ShopProductItem) => (
            <FavoriteProduct item={product} key={product.id} />
          )}
          currentPage={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
