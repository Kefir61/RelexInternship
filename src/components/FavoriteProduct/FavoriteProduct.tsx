import { StarOutlined } from "@ant-design/icons";
import { IShopProductItem } from "@utils";
import React, { FC, useMemo } from "react";
import { ImageScroll } from "../ImageScroll";
import "./FavoriteProductStyle.scss";
import { ShopProductItem } from "src/store/slices/shopSlice";

interface FavoriteProductProps {
  item: ShopProductItem;
}

export const FavoriteProduct: FC<FavoriteProductProps> = ({ item }) => {
  const available = useMemo(
    () => (item.amount ? `В наличии: ${item.amount} шт.` : "Нет в наличии"),
    []
  );

  //TODO сделать у товара массив картинок, а не одну
  return (
    <div className="FavProductBlock">
      <div className="fotoAndInfo">
        {/* <ImageScroll images={[item.mainImageId, "s"]} /> */}
        <div className="infoAboutItem">
          <h2>{item.name}</h2>
          {/* <div className="colorsAndSizes">
            {!!item.colors.length && (
              <div className="colorBlock">
                Цвета:
                {item.colors.map((color) => (
                  <div key={color} style={{ backgroundColor: `${color}` }} className="colorElem" />
                ))}
              </div>
            )}
            {!!item.sizes.length && (
              <div className="sizesBlock">
                Размеры:
                {item.sizes.map((size) => (
                  <div key={size}>{size}</div>
                ))}
              </div>
            )}
          </div> */}
          <div>{available}</div>
        </div>
      </div>
      <div className="priceAndButtonsBlock">
        <StarOutlined className="favIcon" onClick={() => {}} />
        <div className="priceAndButtonsSection">
          <h3 className="priceBlock">Стоимость: {item.price}</h3>
          <div className="buttonsBlock">
            <div className="buyAndInCart">
              <button className="buttonStyled">Купить</button>
              <button className="buttonStyled greenButton">В корзину</button>
            </div>
            <button className="aboutButton">Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  );
};
