import React, { FC } from "react";
import "./productBuy.scss";
import { Button, Space } from "antd";
import { axiosOur, itemToCart } from "@utils";
type ProductBuyProps = {
  id: number;
};

export const ProductBuy: FC<ProductBuyProps> = ({ id }) => {
  const onClickToCart = async () => {
    await itemToCart(id);
  };
  return (
    <Space className="product--buy">
      <Button>Купить</Button>
      <Button onClick={onClickToCart}>В корзину</Button>
    </Space>
  );
};
