import React, { useState } from "react";
import "./shopItem.scss";
import { StarOutlined } from "@ant-design/icons";
import { ShopProductItem } from "src/store/slices/shopSlice";

/*
 * Component shop item
 */
export const ShopItem: React.FC<ShopProductItem> = ({
  imgUrl,
  price,
  amout,
  title,
  colors,
  sizes,
}) => {
  const [favotites, setFavorites] = useState(false);
  return (
    <div className="shop--items__item product">
      <img src={imgUrl} alt="img" className="product--img" />
      <StarOutlined
        style={favotites ? { color: "gold" } : {}}
        className="product--favotites"
        onClick={() => setFavorites(!favotites)}
      />
      <div className="product--informations">
        <div className="product--informations__price">{price}</div>
        <div className="product--informations__stock">
          В наличии: {amout} шт
        </div>
      </div>
      <div className="product--title">{title}</div>
      <div className="product--colors">
        {colors.length != 0 && (
          <>
            Цвета:
            {colors.map((item, index) => (
              <div
                key={index}
                className="product--colors__item"
                style={{ backgroundColor: `${item}` }}
              ></div>
            ))}
          </>
        )}
      </div>
      <div className="product--sizes">
        {sizes.length != 0 && (
          <>
            Размеры:
            {sizes.map((item, index) => (
              <div key={index} className="product--sizes__item">
                {item}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="product--buy">
        <button className="product--buy__pay">Купить</button>
        <button className="product--buy__cart">В корзину</button>
      </div>
      <button className="product--more">Подробнее</button>
    </div>
  );
};
