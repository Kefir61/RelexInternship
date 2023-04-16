import React, { FC, useEffect, useState } from "react";
import { countTotalPrice, selectCart, sendCartOrder } from '../../store/slices/cartSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "./ConfirmOrder.scss";
import { IUserInfo, PageRoutes } from "@utils";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { Loader } from "@components";

export const ConfirmOrder: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {totalPrice, cartList, comment, responseStatus, errorCode, loading, error} = useSelector(selectCart);
    const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user = AppSelector<IUserInfo>(state => state.UserInfo.user);
    const navigate = useNavigate();
    const [response, setResponse] = useState(false);
    const [success, setSuccess] = useState(true);
    const [responseMessage, setResponseMessage] = useState("");
    const [buttonDisabled, setDuttonDisabled] = useState(false)

    useEffect(()=>{
        dispatch(countTotalPrice({cartList}));
    }, [cartList])

    useEffect(() => {
        if (responseStatus === 200) {
          setSuccess(true);
          setResponse(true);
          setResponseMessage("Заказ отправлен успешно");
          setDuttonDisabled(true)
          setTimeout(() => navigate(PageRoutes.SHOPPING_CART), 5000);
        }
      }, [responseStatus]);
    
      useEffect(() => {
        if (error) {
          if (errorCode === "INSUFFICIENT_BALANCE") {
            setResponseMessage("Недостаточно баллов на счете");
          } else {
            setResponseMessage("Что-то пошло не так. Попробуйте еще раз");
          }
          setResponse(true);
          setSuccess(false);
        }
      }, [error]);

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

            {loading && (
              <div className="confirm-order__loader">
                <Loader />
              </div>
            )}

            {response && (
              <div className={success ? "confirm-order__response success" : "confirm-order__response error"}>
                <p className="response__title">{responseMessage}</p>
              </div>
            )}

            <Button
              type="primary"
              size="middle"
              onClick={() => navigate(PageRoutes.SHOPPING_CART)}
              className="confirm-order__button"
            >
             Назад   
            </Button>

            <Button
              type="primary"
              size="middle"
              onClick={() => dispatch(sendCartOrder(comment))}  
              className="confirm-order__button"
              disabled={buttonDisabled}
            >
              Подтвердить
            </Button>

        </section>
    )
}