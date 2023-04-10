import React, { useState } from "react";
import "./shopItem.scss";
import { StarOutlined } from "@ant-design/icons";
import { ShopProductItem } from "src/store/slices/shopSlice";
import { ProductBuy } from "../productBuy";
import { Button, Space } from "antd";
/*
 * Component shop item
 */
export const ShopItem: React.FC<ShopProductItem> = ({
  mainImageId,
  price,
  name,
}) => {
  const colors = ['red', 'green', 'blue']
  const sizes = ['XS', 'L', 'M']
  const [favotites, setFavorites] = useState(false);
  return (
    <div className="shop--items__item shop--item">
      <img src={`${mainImageId}`} alt="img" className="shop--item__img" />
      <StarOutlined
        style={favotites ? { color: "gold" } : {}}
        className="shop--item__favotites"
        onClick={() => setFavorites(!favotites)}
      />
      <div className="shop--item__informations">
        <div className="item--informations__price">{price}</div>
        <div className="item--informations__stock">
          В наличии: {`0`} шт
        </div>
      </div>
      <div className="shop--item__title">{name}</div>
      <div className="shop--item__colors">
        {colors.length != 0 && (
          <>
            Цвета:
            {colors.map((item, index) => (
              <div
                key={index}
                className="item--colors__item"
                style={{ backgroundColor: `${item}` }}
              ></div>
            ))}
          </>
        )}
      </div>
      <div className="shop--item__sizes">
        {sizes.length != 0 && (
          <>
            Размеры:
            {sizes.map((item, index) => (
              <div key={index} className="item--sizes__item">
                {item}
              </div>
            ))}
          </>
        )}
      </div>
      <ProductBuy/>
      <Button>Подробнее</Button>
    </div>
  );
};
