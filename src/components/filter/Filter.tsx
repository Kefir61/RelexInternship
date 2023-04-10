import React, { FC } from "react";
import { Select, Space } from "antd";
import { colorOptions, sizeOptions } from "@utils";
import { useDispatch } from "react-redux";
import {
  setFilterColor,
  setFilterSize,
} from "../../store/slices/shopFilterSlice";

export const Filter: FC = () => {
  const dispatch = useDispatch();
  const handleFilterSize = (value: string) => {
    dispatch(setFilterSize(value));
  };
  const handleFilterColor = (value: string) => {
    dispatch(setFilterColor(value));
  };
  return (
    <Space wrap>
      <Select
        defaultValue="Размер"
        style={{ width: 120 }}
        onChange={handleFilterSize}
        options={sizeOptions}
      />
      <Select
        defaultValue="Цвет"
        style={{ width: 120 }}
        onChange={handleFilterColor}
        options={colorOptions}
      />
    </Space>
  );
};
