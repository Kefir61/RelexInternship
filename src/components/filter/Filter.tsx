import React, { FC } from "react";
import { Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterColor,
  setFilterSize,
} from "../../store/slices/shopFilterSlice";
import { selectShop, setPage } from "../../store/slices/shopSlice";
import { IOption, translateColor } from "@utils";

export const Filter: FC = () => {
  const dispatch = useDispatch();
  const { sizes, colors } = useSelector(selectShop);
  const ruColors = translateColor(colors);

  const colorOptions: IOption[] = [{ value: "", label: "Все" }];
  colors.map((item, index) => {
    colorOptions.push({ value: item, label: ruColors[index] });
  });
  const sizeOptions: IOption[] = [{ value: "", label: "Все" }];
  sizes.map((item) => {
    sizeOptions.push({ value: item, label: item });
  });

  const handleFilterSize = (value: string) => {
    dispatch(setFilterSize(value));
    dispatch(setPage(1))
  };
  const handleFilterColor = (value: string) => {
    dispatch(setFilterColor(value));
    dispatch(setPage(1))
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
