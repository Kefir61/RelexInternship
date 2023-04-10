import React, { FC, useEffect } from "react";
import { countTotalPrice, selectCart } from '../../store/slices/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import "./ValidateOrder.scss";

export const ValidateOrder: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {totalPrice, cartList, deliveryMethod, comment} = useSelector(selectCart);

    useEffect(()=>{
        dispatch(countTotalPrice({cartList}))
    }, [cartList])

    return(
        <section className='validate-order'>
            
            <div className='validate-order__item'>
                <p className='validate-order__title'>Итого:</p>
                <p className='validate-order__value'>{totalPrice}</p>
            </div>

            <div className='validate-order__item'>
                <p className='validate-order__title'>Товаров:</p>
                <p className='validate-order__value'>{cartList.length}</p>
            </div>

            <div className='validate-order__item'>
                <p className='validate-order__title'>Способ получения:</p>
                <p className='validate-order__value'>{deliveryMethod}</p>
            </div>

            <div className='validate-order__item'>
                <p className='validate-order__title'>Комментарий к заказу:</p>
                <p className='validate-order__value'>{comment}</p>
            </div>
            
        </section>
    )
}