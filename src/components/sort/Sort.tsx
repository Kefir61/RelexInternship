import React, { useState } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setSort } from "../../store/slices/shopFilterSlice";
import './sort.scss';

export const Sort = () => {
  const dispatch = useDispatch()
  const [sortValue, setSortValue] = useState('ASC')
  const changeSortValue = () => {
    setSortValue(sortValue!='DESC' ? 'DESC' : 'ASC')
    dispatch(setSort(sortValue))
  }
  return (
    <div onClick={changeSortValue} className="sort">
      По цене: <ArrowDownOutlined className={`sort--arow ${sortValue === 'DESC' ? 'sort--arrow__top' : ''}`}/>
    </div>
  );
};
