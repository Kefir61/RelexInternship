import React from "react";
import "./productBuy.scss";
import { Button, Space } from "antd";
export const ProductBuy = () => {
  return (
    <Space className="product--buy">
      <Button>Купить</Button>
      <Button>В корзину</Button>
    </Space>
  );
};
