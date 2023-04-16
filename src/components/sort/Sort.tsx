import React, { useState } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setSort } from "../../store/slices/shopFilterSlice";
import "./sort.scss";
import { setPage } from "../../store/slices/shopSlice";

export const Sort = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector(selectFilter);
  const changeSortValue = () => {
    dispatch(setSort(sort === "ASC" ? "DESC" : "ASC"));
    dispatch(setPage(1))
  };
  return (
    <div onClick={changeSortValue} className="sort">
      По цене:
      <ArrowDownOutlined
        className={`sort--arow ${sort === "ASC" ? "sort--arrow__top" : ""}`}
      />
    </div>
  );
};
