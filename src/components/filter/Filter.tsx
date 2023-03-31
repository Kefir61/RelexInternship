import React, { FC } from "react";
import { Select, Space } from "antd";
import { colorOptions, sizeOptions } from "@utils";

type FilterProp = {
  handleFilterSize: (value: string) => void;
  handleFilterColor: (value: string) => void;
};

export const Filter: FC<FilterProp> = ({
  handleFilterSize,
  handleFilterColor,
}) => {
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
