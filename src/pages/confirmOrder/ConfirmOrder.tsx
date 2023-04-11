import React, { FC, useEffect } from "react";
import { countTotalPrice, selectCart } from '../../store/slices/cartSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "./ConfirmOrder.scss";
import { IUserInfo, PageRoutes } from "@utils";
import { Button } from "antd";
import { useNavigate } from "react-router";

export const ConfirmOrder: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {totalPrice, cartList, comment} = useSelector(selectCart);
    const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user = AppSelector<IUserInfo>(state => state.UserInfo.user);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(countTotalPrice({cartList}));
    }, [cartList])

    return(
        <section className='confirm-order'>
            
            <div className='confirm-order__item'>
                <p className='confirm-order__title'>Итого:</p>
                <p className='confirm-order__value'>{totalPrice}</p>
            </div>

            <div className='confirm-order__item'>
                <p className='confirm-order__title'>Товаров:</p>
                <p className='confirm-order__value'>{cartList.length}</p>
            </div>

            <div className='confirm-order__item'>
                <p className='confirm-order__title'>Адрес получения:</p>
                <p className='confirm-order__value'>{user.userDeliveries[0].address}</p>
            </div>

            <div className='confirm-order__item'>
                <p className='confirm-order__title'>Комментарий к заказу:</p>
                <p className='confirm-order__value'>{comment}</p>
            </div>

            <Button
                type="primary"
                size="middle"
                onClick={() => navigate(PageRoutes.SHOPPING_CART)}
                className="confirm-order__button"
            >
                Отменить
            </Button>

            <Button
                type="primary"
                size="middle"
                //onClick={} отправка 
                className="confirm-order__button"
            >
                Подтвердить
            </Button>

        </section>
    )
}