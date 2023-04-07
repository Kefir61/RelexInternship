import React, { FC, useEffect } from "react";
import { appSelector } from "../../store/hooks";
import { IOneMyThanks } from "@utils";
import { ListWithPagination } from "../ListWithPagination";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../store/store';
import { fetchMyThanks } from "../../store/slices/myThanksSlice";
import { OneMyThanks } from "../OneMyThanks";
import { Loader } from "../loader";

export const MyThanks: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const MyThanksList = appSelector<IOneMyThanks[]>((state) => state.MyThanks.list);
    const MyThanksPageCount = appSelector<number>((state) => state.MyThanks.totalPages);
    const MyThanksLoading = appSelector<number>((state) => state.MyThanks.totalPages);
    
    useEffect(() => {
        dispatch(fetchMyThanks({ currentPage: 0, pageSize: 3 }));
    }, []);
    
      const onChangeThanksPage = (pageNum: number) => {
        dispatch(
          fetchMyThanks({
            currentPage: pageNum - 1,
            pageSize: 3,
          })
        );
      };
  return (
    <>
        <h3>Мои благодарности:</h3>
        
        {MyThanksLoading ? (
            <ListWithPagination
              content={MyThanksList}
              onChangePage={onChangeThanksPage}
              renderElement={(OneThank: IOneMyThanks) => (
                <OneMyThanks key={`${OneThank.user.id} ${OneThank.createdAt}`} thanks={OneThank} />
              )}
              totalPages={MyThanksPageCount}
            />
        ) : (
            <Loader />
        )}
    </>
  );
};