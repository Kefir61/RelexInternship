import React, { FC, useState } from "react";
import "./productBuy.scss";
import { Alert, Button, Space } from "antd";
import { itemToCart } from "@utils";
import { TProductVarieties } from "src/store/slices/shopSlice";

type ProductBuyProps = {
  id: number;
  quantity: number;
  productVarieties?: TProductVarieties[];
  amount?: number;
};

export const ProductBuy: FC<ProductBuyProps> = ({
  id,
  quantity,
  productVarieties,
  amount,
}) => {
  const [cartAmount, setCartAmount] = useState(
    productVarieties?.reduce((sum, item) => sum + item.cartAmount, 0)
  );
  const onClickToCart = () => {
    itemToCart(id, quantity);
    setCartAmount(cartAmount + 1);
  };
  return (
    <Space className="product--buy">
      <Button>Купить</Button>
      <Button
        disabled={amount === cartAmount}
        onClick={onClickToCart}
        className="product--buy__cart"
      >
        <span>В корзину</span>
        {cartAmount != 0 && (
          <div className="buy--cart__circle">{cartAmount}</div>
        )}
      </Button>
    </Space>
  );
};
