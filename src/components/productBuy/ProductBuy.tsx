import React, { FC } from "react";
import "./productBuy.scss";
import { Alert, Button, Space } from "antd";
import { itemToCart } from "@utils";

type ProductBuyProps = {
  id: number;
  quantity: number;
};

export const ProductBuy: FC<ProductBuyProps> = ({ id, quantity }) => {
  const onClickToCart = () => {
    itemToCart(id, quantity);
  };
  return (
    <Space className="product--buy">
      <Button>Купить</Button>
      <Button onClick={onClickToCart}>В корзину</Button>
    </Space>
  );
};
