import React, { useState } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setSort } from "../../store/slices/shopFilterSlice";
import "./sort.scss";

export const Sort = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector(selectFilter);
  const changeSortValue = () => {
    dispatch(setSort(sort === "ASC" ? "DESC" : "ASC"));
  };
  return (
    <div onClick={changeSortValue} className="sort">
      По цене:
      <ArrowDownOutlined
        className={`sort--arow ${sort === "DESC" ? "sort--arrow__top" : ""}`}
      />
    </div>
  );
};
