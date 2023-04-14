import React, { FC, useCallback, useEffect, useState } from "react";
import { appSelector } from "../../store/hooks";
import { IOneMyThanks } from "@utils";
import { ListWithPagination } from "../ListWithPagination";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchMyThanks } from "../../store/slices/myThanksSlice";
import { OneMyThanks } from "../OneMyThanks";
import { Loader } from "../loader";

export const MyThanks: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const myThanksList = appSelector<IOneMyThanks[]>((state) => state.MyThanks.list);
  const myThanksPageCount = appSelector<number>((state) => state.MyThanks.totalPages);
  const myThanksLoading = appSelector<boolean>((state) => state.MyThanks.loading);
  const error = appSelector<string>((state) => state.MyThanks.error);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMyThanks({ currentPage: 0, pageSize: 3 }));
  }, []);

  const onChangeThanksPage = useCallback((pageNum: number) => {
    setPage(pageNum);
    dispatch(
      fetchMyThanks({
        currentPage: pageNum - 1,
        pageSize: 3,
      })
    );
  }, []);

  return (
    <>
      <h3>Мои благодарности:</h3>
      {error && <div>Что-то пошло не так. Попробуйте еще раз</div>}
      {myThanksLoading && <Loader />}
      {!myThanksList.length && !error && !myThanksLoading && <p>История пуста</p>}

      {!!myThanksList.length && !error && !myThanksLoading && (
        <ListWithPagination
          content={myThanksList}
          onChangePage={onChangeThanksPage}
          renderElement={(OneThank: IOneMyThanks) => (
            <OneMyThanks key={`${OneThank.user.id} ${OneThank.createdAt}`} thanks={OneThank} />
          )}
          currentPage={page}
          totalPages={myThanksPageCount}
        />
      )}
    </>
  );
};
