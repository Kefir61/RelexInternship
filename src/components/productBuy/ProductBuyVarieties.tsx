import React, { FC, useState } from "react";
import "./productBuy.scss";
import { Alert, Button, Space } from "antd";
import { itemToCart } from "@utils";
import { TProductVarieties } from "src/store/slices/shopSlice";

type ProductBuyVarietiesProps = {
  quantity: number;
  product: TProductVarieties;
  amount: number;
  setCartAmount: (cartAnount: number) => void;
  cartAmount: number;
};

export const ProductBuyVarieties: FC<ProductBuyVarietiesProps> = ({
  product,
  quantity,
  amount,
  cartAmount,
  setCartAmount,
}) => {
  const onClickToCart = () => {
    itemToCart(product.id, quantity);
    setCartAmount(cartAmount + quantity);
  };

  console.log(amount);
  return (
    <Space className="product--buy">
      <Button>Купить</Button>
      <Button
        disabled={product.quantity - cartAmount === 0}
        onClick={onClickToCart}
      >
        <span>В корзину</span>
      </Button>
    </Space>
  );
};
