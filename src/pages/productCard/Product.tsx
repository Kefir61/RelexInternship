import React, { FC } from "react";
import "./Product.scss";
import { Filter, ProductBuy } from "@components";
import { Button, InputNumber } from "antd";
import { StarOutlined } from "@ant-design/icons";
export const Product: FC = ({}) => {
  return (
    <div className="product">
      <div className="product--info">
        <div className="product--info__images">
          <div className="info--images__scroll"></div>
          <div className="info--images__main">
            <img/>
            <Button className="images--main__button" type="link">Посмотреть</Button>
          </div>
          <StarOutlined />
        </div>
        <div className="product--info__counts">В наличии: 8шт</div>
        <div className="product--info__colors">Цвета: </div>
        <div className="product--info__sizes">Размеры: </div>
        <div className="product--info__description">Описание товара: </div>
      </div>
      <div className="product--panel">
        <div className="product--panel__name">Название товара</div>
        <div className="product--panel__price">
          <span>Цена:</span>
          <span>10.00</span>
        </div>
        <div className="product--panel__selects">
          <Filter />
        </div>
        <div className="product--panel__counts">
          <span>Колиество</span>
          <InputNumber min={1} max={10} defaultValue={0} />
        </div>
        <ProductBuy />
      </div>
    </div>
  );
};
