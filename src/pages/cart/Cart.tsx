import React, { FC, useEffect, useState } from "react";
import { CartItem, CartOrderInfo, Loader } from "@components";
import './Cart.scss';
import { useDispatch, useSelector } from "react-redux";
import { ShopProductItem, selectShop } from "../../store/slices/shopSlice";
import { AppDispatch } from '../../store/store';
import { fetchCart, selectCart } from "../../store/slices/cartSlice";

export const Cart: FC = () => {
    const { list } = useSelector(selectShop);
    const [cartList, setCartList] = useState(list);
    const dispatch = useDispatch<AppDispatch>();
    const {loading, error} = useSelector(selectCart);

    useEffect(()=>{
        dispatch(fetchCart({}))
    }, [])
    
    const removeCartItem = (id: number) => {
        setCartList(cartList.filter(i => i.id !== id))        
    }

    return (
        <section className='cart'>
            <div className='cart__items'>
                {loading && <div className='cart__loader'><Loader /></div>}

                {error ? <div className='cart__error'>Что-то пошло не так. Попробуйте еще раз</div>
                : cartList.length ? 
                    cartList.map((item: ShopProductItem) => (
                        <CartItem key={item.id} {...item} removeCartItem={removeCartItem}  />
                    ))
                : <p className='cart__empty'>Корзина пуста</p>}

            </div>
            
            <div className='cart__oreder-info'>
                <CartOrderInfo cartList={cartList}  />
                <button className='cart__button'>Оформить заказ</button>
            </div>
        </section>
    )
}