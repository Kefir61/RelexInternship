import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchMyOrders, selectMyOrders } from '../../store/slices/myOrdersSlice';
import './MyOrders.scss';
import { format, utcToZonedTime } from "date-fns-tz";

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
                return (
                    <div className="my-order" key={item.id}>
                        <p className="orders__text">{item.id}</p>
                        <p className="orders__text">{item.registeredAt}</p>
                        <p className="orders__text">{item.orderSum}</p>
                        <p className="orders__text">{item.status}</p>
                    </div>
                )
            })}
        </section>
    )
}