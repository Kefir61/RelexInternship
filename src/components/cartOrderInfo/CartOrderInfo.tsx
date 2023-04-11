import TextArea from "antd/es/input/TextArea";
import React, { FC, useEffect } from "react";
import "./CartOrderInfo.scss";
import { countTotalPrice, selectCart } from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { ShopProductItem } from "src/store/slices/shopSlice";

interface CartOrderInfoProps {
  cartList: ShopProductItem[];
}

export const CartOrderInfo: FC<CartOrderInfoProps> = ({ cartList }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalPrice } = useSelector(selectCart);

  useEffect(() => {
    dispatch(countTotalPrice({}));
  }, []);

  return (
    <section className="cart-order-info">
      <div className="cart-order-info__item">
        <p className="cart-order-info__title">Итого:</p>
        <p className="cart-order-info__price">{totalPrice}</p>
      </div>

      <div className="cart-order-info__item">
        <p className="cart-order-info__title">Товаров:</p>
        <p className="cart-order-info__title">{cartList.length} шт.</p>
      </div>

      <div className="cart-order-info__item">
        <p className="cart-order-info__title">Способ получения:</p>
        <p className="cart-order-info__title">Забрать в офисе</p>
      </div>

      <div className="cart-order-info__comment">
        <p className="cart-order-info__title">Комментарий к заказу:</p>
        <TextArea
          placeholder="Хочу получить заказ во второй половине дня"
          autoSize={{ minRows: 5, maxRows: 6 }}
          // value={thanksValue}
          //onChange={onChangeTextfield}
          className="cart-order-info__textarea"
          id="thanks"
          name="thanks"
        />
      </div>
    </section>
  );
};
