import React from "react";
import "./Product.scss";

export const Product = () => {
  return (
    <div className="product">
      <div className="product--info">
        <div className="product--info__images"></div>
        <div className="product--info__counts">В наличии: 5шт</div>
        <div className="product--info__colors">Цвета: </div>
        <div className="product--info__sizes">Размеры: </div>
        <div className="product--info__description">Описание товара: </div>
      </div>
      <div className="product--panel">
        <div className="product--panel__name"></div>
        <div className="product--panel__price">Цена </div>
        <div className="product--panel__selects"></div>
        <div className="product--panel__counts">Колиество </div>
        <div className="product--panel__buy">
          <button className="panel--buy__pay"></button>
          <button className="panel--buy__cart"></button>
        </div>
      </div>
    </div>
  );
};
