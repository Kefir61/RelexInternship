import React from "react";
import { Select, Space } from "antd";
import { useDispatch } from "react-redux";
import { setFilterColor, setFilterSize } from "../../store/slices/filterSlice";

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const handleFilterColor = (value: string) => {
    dispatch(setFilterColor(value))
  };
  const handleFilterSize = (value: string) => {
    dispatch(setFilterSize(value))
  };
  return (
    <Space wrap>
      <Select
        defaultValue="Размер"
        style={{ width: 120 }}
        onChange={handleFilterSize}
        options={[
          { value: "", label: "Все" },
          { value: "XS", label: "XS" },
          { value: "S", label: "S" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
        ]}
      />
      <Select
        defaultValue="Цвет"
        style={{ width: 120 }}
        onChange={handleFilterColor}
        options={[
          { value: "", label: "Все" },
          { value: "red", label: "Красный" },
          { value: "blue", label: "Синий" },
          { value: "orange", label: "Оранжевый" },
        ]}
      />
    </Space>
  );
};
