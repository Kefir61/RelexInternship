import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchMyOrders, selectMyOrders } from '../../store/slices/myOrdersSlice';
import './MyOrders.scss';
import { MyOrderRow } from "@components";

export const MyOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {ordersList} = useSelector(selectMyOrders);
    
  useEffect(() => {
    dispatch(fetchMyOrders({}));
  }, []);

    return(
        <section className='orders'>

            <div className="orders__title">
                <p className="orders__text">Номер</p>
                <p className="orders__text">Дата и время</p>
                <p className="orders__text">Сумма</p>
                <p className="orders__text">Статус</p>
            </div>
            
            {ordersList.map((item)=>{
                return <MyOrderRow key={item.id} {...item}/>
            })}
        </section>
    )
}