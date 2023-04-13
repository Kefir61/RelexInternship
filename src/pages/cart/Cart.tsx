import React, { FC, useEffect } from "react";
import { CartItem, CartOrderInfo, Loader } from "@components";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../store/store';
import { cartItemProps, fetchCart, selectCart } from "../../store/slices/cartSlice";

export const Cart: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, cartList} = useSelector(selectCart);

  useEffect(()=>{
    dispatch(fetchCart({}))
  }, [])

  return (
    <section className="cart">

      <div className="cart__items">
        
        {loading && (
          <div className="cart__loader">
            <Loader />
          </div>
        )}

        {error && <div className="cart__error">Что-то пошло не так. Попробуйте еще раз</div>}
        
        {!!cartList.length &&
          !error &&
          cartList.map((product: cartItemProps) => (
            <CartItem key={product.productVariety.id} {...product} />
          ))
        }
        
        {!cartList.length && !error && <p className="cart__empty">Корзина пуста</p>}
      </div>

      <div className="cart__oreder-info">
        <CartOrderInfo />
      </div>

    </section>
  );
};
