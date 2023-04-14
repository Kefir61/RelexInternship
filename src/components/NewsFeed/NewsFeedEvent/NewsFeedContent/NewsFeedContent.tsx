import { ENewsTypes } from "@utils";
import React, { FC } from "react";
import { Link } from "react-router-dom";

interface NewsFeedContentProps {
  type: ENewsTypes;
  eventTitle?: string;
  eventDescription?: string;
  orderAmount?: number;
  productId?: number;
  productName?: string;
  comment?: string;
}

export const NewsFeedContent: FC<NewsFeedContentProps> = ({
  type,
  eventTitle,
  eventDescription,
  orderAmount,
  productId,
  productName,
  comment,
}) => {
  return (
    <>
      {type === "thanks" && <h3>{comment}</h3>}
      {type === "event_results" && (
        <h3>
          <div>{eventTitle}</div>
          <div>{eventDescription}</div>
        </h3>
      )}
      {type === "event_user_registered" && (
        <h3>
          Вы зарегистрировались в качестве участника конкурса
          <Link to="#href">{eventTitle}</Link>
        </h3>
      )}
      {type === "new_event" && (
        <h3>
          <div>
            Конкурс {eventTitle} <button>Учавствовать</button>
          </div>
          <div>{eventDescription}</div>
        </h3>
      )}
      {type === "new_order" && (
        <h3>
          В магазине размещён новый товар
          <Link to="#href">{productName}</Link>
        </h3>
      )}
      {type === "new_product" && <h3>Вы совершили покупку в магазине на сумму {orderAmount}</h3>}
    </>
  );
};
