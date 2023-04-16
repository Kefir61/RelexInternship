import React, { FC, useMemo } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import { ordersInfo } from '../../store/slices/myOrdersSlice';
import './MyOrderRow.scss';

export const MyOrderRow: FC<ordersInfo> = (item) => {
    const farmatedDate = useMemo(() => {
        const date = new Date(item.registeredAt);
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const zonedDate = utcToZonedTime(date, timeZone);
        const pattern = "dd.MM.yyyy HH:mm";
        return format(zonedDate, pattern, { timeZone });
    }, []);

    return (
        <div className="my-order" key={item.id}>
            <p className="my-order__text">{item.id}</p>
            <p className="my-order__text">{farmatedDate}</p>
            <p className="my-order__text">{item.orderSum}</p>
            <p className="my-order__text">{item.status}</p>
        </div>
    )
}