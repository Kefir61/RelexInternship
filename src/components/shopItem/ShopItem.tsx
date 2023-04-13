import React, { useState } from "react";
import "./shopItem.scss";
import { StarOutlined } from "@ant-design/icons";
import { ShopProductItem } from "src/store/slices/shopSlice";
import { ProductBuy } from "../productBuy";
import { Button } from "antd";
/*
 * Component shop item
 */
export const ShopItem: React.FC<ShopProductItem> = ({
  mainImageId,
  price,
  name,
  amount,
  productVarieties,
}) => {
  const colors = [...(new Set(productVarieties.map((item: any) => item.color)))].filter((elem) => elem);
  const sizes = [...(new Set(productVarieties.map((item: any) => item.size)))].filter((elem) => elem);

  const imgUrl = mainImageId
    ? //TODO: поменять на BASE_URL, когда это исправят на беке
      `${process.env.IMAGE_URL}?id=${mainImageId}`
    : `${process.env.IMAGE_URL}`;

  const [favotites, setFavorites] = useState(false);

  return (
    <div className="shop--items__item shop--item">
      <div className="shop--item__img">
        <img src={imgUrl} alt="img" />
      </div>
      <StarOutlined
        style={favotites ? { color: "gold" } : {}}
        className="shop--item__favotites"
        onClick={() => setFavorites(!favotites)}
      />
      <div className="shop--item__informations">
        <div className="item--informations__price">{price}</div>
        <div className="item--informations__stock">В наличии: {amount} шт</div>
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
      <ProductBuy id={productVarieties[0].id} />
      <Button>Подробнее</Button>
    </div>
  );
};
