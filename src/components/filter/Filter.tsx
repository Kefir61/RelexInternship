import React from "react";
import { Select, Space } from "antd";
import { useDispatch } from "react-redux";

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {};
  return (
    <Space wrap>
      <Select
        defaultValue="Размер"
        style={{ width: 120 }}
        onChange={handleChange}
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
        onChange={handleChange}
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
