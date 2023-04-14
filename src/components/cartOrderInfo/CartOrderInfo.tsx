import TextArea from "antd/es/input/TextArea";
import React, { FC, useEffect, useState } from "react";
import './CartOrderInfo.scss';
import { countTotalPrice, selectCart, setComment } from '../../store/slices/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../store/store';
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "@utils";

export const CartOrderInfo: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {totalPrice, cartList, deliveryMethod, error} = useSelector(selectCart);
    const navigate = useNavigate();
    const [buttonDisabled, setDuttonDisabled] = useState(false)

    useEffect(()=>{
      dispatch(countTotalPrice({cartList}));
      setDuttonDisabled(!cartList.length);
    }, [cartList])

    const onChangeTextfield = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const comment = e.target.value;
      dispatch(setComment({comment}));
    };

    useEffect(() =>{
      if(error || !cartList.length){
        setDuttonDisabled(true)
      }      
    }, [error, cartList])

  return (
    <section className="cart-order-info">
      
      <div className="cart-order-info__item">
        <p className="cart-order-info__title">Итого:</p>
        <p className="cart-order-info__price">{totalPrice}</p>
      </div>

      <div className='cart-order-info__item'>
        <p className='cart-order-info__title'>Товаров:</p>
        <p className='cart-order-info__title'>{cartList.length && `${cartList.length} шт.`}</p>
      </div>

      <div className='cart-order-info__item'>
        <p className='cart-order-info__title'>Способ получения:</p>
        <p className='cart-order-info__title'>{deliveryMethod}</p>
      </div>

      <div className='cart-order-info__comment'>
        <p className='cart-order-info__title'>Комментарий к заказу:</p>
        <TextArea
          placeholder="Хочу получить заказ во второй половине дня"
          autoSize={{ minRows: 5, maxRows: 6 }}
          onChange={onChangeTextfield}
          className='cart-order-info__textarea'
          id="thanks" 
          name="thanks"
        />
      </div>

      <button 
        className={
          buttonDisabled
            ? "cart-order-info__link disabled"
            : "cart-order-info__link"
        }
        onClick={() => navigate(PageRoutes.CONFIRM_ORDER)}
        disabled={buttonDisabled}
      >Оформить заказ</button>
            
    </section>
  )
}
