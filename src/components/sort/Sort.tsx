import React, { useState } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setSort } from "../../store/slices/filterSlice";
import './sort.scss';

export const Sort = () => {
  const dispatch = useDispatch()
  const [sortValue, setSortValue] = useState('ASC')
  const onClickSort = () => {
    setSortValue(sortValue!='DESC' ? 'DESC' : 'ASC')
    dispatch(setSort(sortValue))
  }
  return (
    <div onClick={onClickSort} className="sort">
      По цене: <ArrowDownOutlined className={`sort--arow ${sortValue === 'ASC' ? 'sort--arrow_button' : 'sort--arrow__top'}`}/>
    </div>
  );
};
